"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3Alt, faJs } from "@fortawesome/free-brands-svg-icons";
import { Settings, ExpandMore, Edit, Check, Clear } from "@mui/icons-material";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserData from "@/app/projects/components/UserData";
import { db } from "@/config/firebase.config";
import { doc, getDoc, updateDoc, arrayUnion, collection, query, where, increment, DocumentSnapshot, DocumentData  } from "firebase/firestore"; 
import { useSelector, useDispatch } from "react-redux";
import { clearWorkspace } from "@/redux/user.slice";
import { RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import { ProjectCardProps }  from "@/app/projects/components/ProjectCard";


export interface EditProjectProps {
  html: string;
  css: string;
  js: string;
  PrevOuput: string;
  prevTitle: string;
}


const Editor = () => {
  const [cssPlaceholder ] = useState(`h1 {
  color: #fff;
}
    `);
  const html = useSelector((state: RootState) => state.user.DisplayProject.htmlCode);
  const css = useSelector((state: RootState) => state.user.DisplayProject.cssCode);
  const js = useSelector((state: RootState) => state.user.DisplayProject.jsCode);
  const PrevOutput = useSelector((state: RootState) => state.user.DisplayProject.output);
  const prevTitle = useSelector((state: RootState) => state.user.DisplayProject.title);

  const [htmlCode, setHtmlCode ] = useState(html);
  const [ cssCode, setCssCode ] = useState(css)
  const [ jsCode, setJsCode ] = useState(js);
  const [ ouput, setOutput ] = useState(PrevOutput);
  const [ title, setTitle ] = useState(prevTitle);
  const [ editTitle, setEditTitle ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);
  const id = useSelector((state: RootState) => state.user.id);
  const author = useSelector((state: RootState) => state.user.displayName);
  const picture = useSelector((state: RootState) => state.user.profilePicUrl);
  
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearWorkspace())
    console.log(html)

    console.log(htmlCode)
    setHtmlCode(html)
    setCssCode(css)
    setJsCode(js)
    setOutput(PrevOutput)
    setTitle(prevTitle)
    console.log(htmlCode)
  };

  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "caditor-users", id);
      const colRef = collection(db, "caditor-users");
      const document = await getDoc(docRef);
      if (document.exists()) {
        // check length of projs 
        const oldProject = document.data().projects ? document.data().projects.filter((item: ProjectCardProps, index: number) => {
          console.log(title)
          console.log(item.title)
          console.log(item.title === title)
          return item.title === title;
        }) : null;

        if (oldProject && oldProject.length > 0) {
          //update existing project
          // use proj id as array index
          // editor should accept proj props, set proj array idx projid to proj in editor
          console.log(oldProject)
          toast({
            description: "Changes updated.",
          })
        } else {
          // save new proj
          const projectId = Number(document.data().totalProjects);
          console.log(projectId)

          const newProject: ProjectCardProps = {
            title,
            htmlCode,
            cssCode,
            jsCode,
            ouput,
            userId: id,
            author,
            picture,
            saved: false,
            projectId
          };
          updateDoc(docRef, {
            projects: arrayUnion(newProject)
          })
          updateDoc(docRef, {
            totalProjects: increment(1)
          })
          toast({
            description: "New project saved.",
          })
        }
      } else {
        console.log("doc not found... create user!")
        // redirect to sign in, but hold the data temporaily
        router.push("/signin")
      }
      //update doc
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error saving project. Try signing in",
      })
      console.log(error)
    }
    setIsSaving(false)
  };


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
      <div className="flex justify-between items-center gap-2 mb-3">
        <h4 className="flex justify-between items-center gap-4">
          { editTitle? 
           <div className="flex justify-between items-center gap-4 hover:opacity-75 transition-all duration-200 ease-in-out">
            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="edit title..." className="bg-transparent outline-none hover:outline-[hsl(var(--accent))] px-2"/>
            <span onClick={() => setEditTitle(!editTitle)} className="flex justify-between items-center"><Check fontSize="small" className="cursor-pointer" /></span>
           </div> : 
           <div className="flex justify-between items-center gap-4 hover:opacity-75 transition-all duration-200 ease-in-out">
            <span>{title}</span>
            <span onClick={() => setEditTitle(!editTitle)} className="flex justify-between items-center"><Edit fontSize="small" className="cursor-pointer" /></span>
           </div>
          }
          <span onClick={handleClear} className="cursor-pointer px-3 bg-[hsl(var(--destructive))] hover:opacity-75 transition-all duration-300 ease-in-out">clear space <Clear /></span>
        </h4>
        <div className="flex justify-between items-center gap-4">
          <Button disabled={isSaving} onClick={handleSaveProject} className='md:px-16 2xl:px-20 bg-[hsl(var(--accent))]'>{isSaving ? "Saving..." : "Save"}</Button>
          <UserData />
        </div>
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

