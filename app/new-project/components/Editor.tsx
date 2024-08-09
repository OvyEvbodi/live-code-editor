"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3Alt, faJs } from "@fortawesome/free-brands-svg-icons";
import { Settings, ExpandMore, Edit } from "@mui/icons-material";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Editor = () => {
  const [htmlCode, setHtmlCode ] = useState("");
  const [cssPlaceholder ] = useState(`h1 {
  color: #fff;
}
    `);
  const [cssCode, setCssCode ] = useState("")
  const [jsCode, setJsCode ] = useState("");
  const [ouput, setOutput ] = useState("");


  useEffect(() => {
    const handlePreview = () => {
      setOutput(`
<html>
  <head>
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
    <script>${jsCode}</script>
  </body>
</html>
      `)
    };
    handlePreview()
  }, [htmlCode, cssCode, jsCode])

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h4 className="flex justify-between gap-4 cursor-pointer hover:opacity-75 transition-all duration-200 ease-in-out">New Project <Edit fontSize="small" /></h4>
        <Button className='md:px-20 bg-[hsl(var(--accent))]'>Save</Button>
      </div>
      <div className="border-2 bg-[hsl(var(--background))] w-full h-[80dvh] text-[hsl(var(--foreground))]">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
                <section className="h-full flex flex-col">
                  <div className="flex justify-between">
                    <div className="flex gap-2 p-1 px-4 bg-[hsl(var(--secondary))]">
                      <FontAwesomeIcon icon={faHtml5} className="text-red-500 w-4"/>
                      <h5 className="text-sm font-bold">html</h5>
                    </div>
                    <div className="cursor-pointer px-1">
                    <Settings fontSize="small"/>
                    <ExpandMore fontSize="small"/>
                    </div>
                  </div>
                  <div className="flex-grow mt-2 p-2 border-x border-[hsl(var(--accent))]">
                    <CodeMirror
                      theme={tokyoNight}
                      placeholder="<h1>Welcome to caditor!</h1>"
                      value={htmlCode} 
                      height="400px"
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => setHtmlCode(value)}
                    />
                  </div>
                </section>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <section className="h-full flex flex-col">
                  <div className="flex justify-between">
                    <div className="flex gap-2 p-1 px-4 bg-[hsl(var(--secondary))]">
                      <FontAwesomeIcon icon={faCss3Alt} className="text-blue-500 w-4"/>
                      <h5 className="text-sm font-bold">css</h5>
                    </div>
                    <div className="cursor-pointer px-1">
                      <Settings fontSize="small"/>
                      <ExpandMore fontSize="small"/>
                    </div>
                  </div>
                  <div className="flex-grow mt-2 p-2">
                    <CodeMirror
                      theme={tokyoNight}
                      placeholder={cssPlaceholder}
                      value={cssCode} 
                      height="400px"
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => setCssCode(value)}
                    />
                  </div>
                </section>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <section className="h-full flex flex-col">
                  <div className="flex justify-between">
                    <div className="flex gap-2 p-1 px-4 bg-[hsl(var(--secondary))]">
                      <FontAwesomeIcon icon={faJs} className="text-yellow-500  w-4"/>
                      <h5 className="text-sm font-bold">js</h5>
                    </div>
                    <div className="cursor-pointer px-1">
                    <Settings fontSize="small"/>
                    <ExpandMore fontSize="small"/>
                    </div>
                  </div>
                  <div className="flex-grow mt-2 p-2 border-x border-[hsl(var(--accent))]">
                    <CodeMirror
                      theme={tokyoNight}
                      placeholder="console.log('Caditor!');"
                      value={jsCode} 
                      height="400px"
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => setJsCode(value)}
                    />
                  </div>
                </section>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="p-2">
            <iframe
            title="code output"
            srcDoc={ouput}
            className="w-full h-full"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default Editor;

