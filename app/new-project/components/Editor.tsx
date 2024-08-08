import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3Alt, faJs } from "@fortawesome/free-brands-svg-icons";
import { Settings, ExpandMore } from "@mui/icons-material";

const Editor = () => {
  return (
    <div>
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
                <div className="flex-grow mt-2">
                  body
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
                <div className="flex-grow mt-2">
                  body
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
                
                <div className="flex-grow mt-2">
                  body
                </div>
              </section>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>terminal</ResizablePanel>
      </ResizablePanelGroup>
      </div>
      <div></div>
    </div>
  )
}

export default Editor;

