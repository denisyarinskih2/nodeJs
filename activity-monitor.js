const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");

const logFileName = "activityMonitor.log";

// getting process info based on OS
function getProcessInfo() {
  let command;
  if (os.platform === "win32") {
    command =
      "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
  } else {
    command = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 2 | tail -n 1";
  }
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// logging process info into the file
function logProcessInfo(info) {
  const timestamp = Math.floor(Date.now() / 1000);
  const logLine = `${timestamp} : ${info}\n`;
  fs.appendFile(logFileName, logLine, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

// displaying process info
async function displayProcessInfo() {
  try {
    const processInfo = await getProcessInfo();
    console.clear();
    console.log(processInfo);
    // calling logProcessInfo after 60 seconds
    if (new Date().getSeconds() === 0) {
      logProcessInfo(processInfo);
    }
  } catch (error) {
    console.error("Error getting process info:", error);
  }
}

async function main() {
  if (!fs.existsSync(logFileName)) {
    fs.writeFileSync(logFileName, "");
  }

  setInterval(displayProcessInfo, 100);
}

main();
