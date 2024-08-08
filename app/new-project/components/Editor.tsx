import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3Alt, faJs } from "@fortawesome/free-brands-svg-icons";

const Editor = () => {
  return (
    <div>
      <div className="border-2 bg-[hsl(var(--background))] w-full h-[80dvh] text-[hsl(var(--foreground))]">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <section className="h-full flex flex-col">
                <div className="flex gap-2 bg-yellow-500 p-2">
                  <h5 className="text-sm font-bold">html</h5>
                  <FontAwesomeIcon icon={faHtml5} className="w-4"/>
                </div>
                <div className="flex-grow mt-2">
                  body
                </div>
              </section>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <section className="h-full flex flex-col">
                <div className="flex gap-2 bg-blue-500 p-2">
                  <h5 className="text-sm font-bold">css</h5>
                  <FontAwesomeIcon icon={faCss3Alt} className="w-4"/>
                </div>
                <div className="flex-grow mt-2">
                  body
                </div>
              </section>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <section className="h-full flex flex-col">
                <div className="flex gap-2 bg-red-500 p-2">
                  <h5 className="text-sm font-bold">js</h5>
                  <FontAwesomeIcon icon={faJs} className="w-4"/>
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

