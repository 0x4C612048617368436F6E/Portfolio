import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "@xterm/xterm/css/xterm.css";

const terminal = new Terminal({
  cursorBlink: true,
});
const fitAddon = new FitAddon();
const terminalDOM = document.getElementById("terminal");
try {
  if (terminal == null) throw "DOM element does not exist";
} catch (err) {
  console.log(err);
}
terminal.loadAddon(fitAddon);
terminal.open(document.getElementById("terminal"));
fitAddon.fit(); // Resize the terminal to fit the container

terminal.writeln("Welcome to La HashCon");
