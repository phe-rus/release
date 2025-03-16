import { exec } from "child_process";
import { promisify } from "util";
import net from "net"; // Import the net module

const execAsync = promisify(exec);

async function getGitVersion() {
  try {
    const { stdout } = await execAsync("git --version");
    return stdout.trim();
  } catch (error) {
    return null;
  }
}

async function getDockerVersion() {
  try {
    const { stdout } = await execAsync("docker --version");
    return stdout.trim();
  } catch (error) {
    return null;
  }
}

async function checkConnectivity(host = "8.8.8.8", port = 53) {
  // Default to Google DNS
  return new Promise((resolve) => {
    const socket = net.createConnection(port, host);
    socket.on("connect", () => {
      socket.end();
      resolve(true); // Connected
    });
    socket.on("error", (err) => {
      socket.end();
      resolve(false); // Not connected
    });
  });
}

export async function GET() {
  try {
    const connected = await checkConnectivity();
    const gitVersion = await getGitVersion();
    const dockerVersion = await getDockerVersion();

    return Response.json({
      platform: process.platform,
      status: `${connected ? "connected" : "disconnected"}`,
      technology: {
        gitVersion: gitVersion,
        dockerVersion: dockerVersion,
      },
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
