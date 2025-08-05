import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "@xterm/xterm/css/xterm.css";
import { data, logoFile, customMetasploitAnsiEscapemapper } from "./data";

const serverURL = "";

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
terminal.focus();
fitAddon.fit(); // Resize the terminal to fit the container
//event listener for window resize
//document.addEventListener();
//fetch data from server and based on number, render that
//immeddiately call
/*(() => {
  fetch(serverURL).then(() => {});
})();*/

terminal.writeln("");
//map over data
data.map((value) => {
  if (Array.isArray(value)) {
    console.log(value[0].label);
    if (value[0].label === "Documentation:") {
      value[0].label = "* Documentation:";
      terminal.write(`    ${value[0].label}`);
    } else if (value[0].label === "Support:") {
      value[0].label = "* Support:";
      terminal.write(`    ${value[0].label}`);
    } else {
      terminal.write(`    ${value[0].label}`);
    }
    //terminal.writeln(`     ${value[0].label}`);
    terminal.writeln(`    ${value[1].hint}`);
  } else {
    if (value.label === "About:") {
      terminal.writeln(`    ${value.label}`);
      terminal.writeln("");
    } else if (
      value.label.split(" ")[0] === "System" &&
      value.label.split(" ")[1] === "information"
    ) {
      terminal.writeln(`    ${value.label}`);
      terminal.writeln("");
    } else {
      terminal.writeln(`    ${value.label}`);
    }
  }
});

//%grn -> index 8
terminal.writeln(`
${customMetasploitAnsiEscapemapper[8]["%grn"]}
 ┌──(h4x0r㉿lahashcon)-[~/projects]
`);
terminal.write(` └─$ `);

//only enable inputs after all of that
let InputBuffer = [];

const customStringCreator = (array) => {
  let returnString = "";
  console.log(array);
  for (let i = 0; i < array.lenght; i++) {
    returnString.concat(array[i]);
  }
  console.log(returnString);
  return returnString;
};

terminal.onData((key) => {
  if (key.charCodeAt(0) === 13) {
    terminal.writeln(InputBuffer.toString());
    terminal.writeln(`
${customMetasploitAnsiEscapemapper[8]["%grn"]}
 ┌──(h4x0r㉿lahashcon)-[~/projects]
`);
    terminal.write(` └─$ `);
    //clear input Buffer
  } else {
    InputBuffer.push(key);
    console.log("String value: ", customStringCreator(InputBuffer));
    terminal.write(
      `${customMetasploitAnsiEscapemapper[2]["%whi"]} InputBuffer.toString()`
    );
  }
});
