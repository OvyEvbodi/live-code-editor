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
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore"; 
import { useSelector, useDispatch } from "react-redux";
import { clearWorkspace, clearTab, setCode } from "@/redux/user.slice";
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

const SettingsTool = ({codeTab}: any ) => {
  const [showClearTab, setShowClearTab] = useState(false);
  const dispatch = useDispatch();
  const handleClearTab = (code: string) => {
    setShowClearTab(!showClearTab)
    dispatch(clearTab(code))
  };

  return (
    <div className="cursor-pointer px-1">
      <div onClick={() => setShowClearTab(!showClearTab)}>
        <Settings fontSize="small"/>
        <ExpandMore fontSize="small"/>
      </div>
      <div className={` ${showClearTab ? "" : "hidden"} z-20 absolute top-8 right-0 p-1 px-2 text-xs hover:bg-[hsl(var(--secondary))]`} >
        <div onClick={() => handleClearTab(codeTab)}>clear tab</div>
      </div>
    </div>
  )
};

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
  const projectId = useSelector((state: RootState) => state.user.DisplayProject.projectId);

  const [htmlCode, setHtmlCode ] = useState(html);
  const [ cssCode, setCssCode ] = useState(css);
  const [ jsCode, setJsCode ] = useState(js);
  const [ output, setOutput ] = useState(PrevOutput);
  const [ title, setTitle ] = useState(prevTitle);
  const [ editTitle, setEditTitle ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ showDelete, setShowDelete ] = useState(false);
  const id = useSelector((state: RootState) => state.user.id);
  const author = useSelector((state: RootState) => state.user.displayName);
  const picture = useSelector((state: RootState) => state.user.profilePicUrl);

  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearWorkspace())
    setHtmlCode(html)
    setCssCode(css)
    setJsCode(js)
    setOutput(PrevOutput)
    setTitle(prevTitle)
  };

  const handleShowDelete = () => {
    setShowDelete(!showDelete)
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "caditor-users", id);
      const document = await getDoc(docRef);
      if (document.exists()) {
        // check length of projs 
        const oldProject = document.data().projects ? document.data().projects.filter((item: ProjectCardProps) => {
          console.log(projectId)
          console.log(item.projectId)
          console.log(item.projectId === projectId)
          return item.projectId === projectId;
        }) : null;
        if (oldProject && oldProject.length > 0) {
          //update existing project
          const projData = document.data().projects.filter((item: ProjectCardProps, index: number) => {
            console.log(index !== projectId)
            return index !== projectId
          });
          console.log(projData)
          updateDoc(docRef, {
            projects: projData
          })
          updateDoc(docRef, {
            totalProjects: increment(-1)
          })
          handleClear()
          toast({
            description: "Project deleted!",
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "caditor-users", id);
      const document = await getDoc(docRef);
      if (document.exists()) {
        // check length of projs 
        const oldProject = document.data().projects ? document.data().projects.filter((item: ProjectCardProps) => {
          console.log(projectId)
          console.log(item.projectId)
          console.log(item.projectId === projectId)
          return item.projectId === projectId;
        }) : null;

        if (oldProject && oldProject.length > 0) {
          //update existing project
          const projData = document.data().projects.map((item: ProjectCardProps, index: number) => {
            if (index === projectId) {
              console.log(index, projectId)
              item.htmlCode = htmlCode,
              item.cssCode = cssCode,
              item.jsCode = jsCode,
              item.output = output,
              item.title = title
            }
            return item
          });
          updateDoc(docRef, {
            projects: projData
          })
          toast({
            description: "Changes updated.",
          })
        } else {
          // save new proj
          const projectId = Number(document.data().totalProjects);

          const newProject: ProjectCardProps = {
            title,
            htmlCode,
            cssCode,
            jsCode,
            output,
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
    setHtmlCode(html)
    setCssCode(css)
    setJsCode(js)
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
  }, [html, css, js, htmlCode, cssCode, jsCode])

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-3">
        <h4 className="flex justify-between items-center gap-4">
          { editTitle? 
           <div className="flex justify-between items-center gap-4 hover:opacity-75 transition-all duration-200 ease-in-out">
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="edit title..." className="bg-transparent outline-none hover:outline-[hsl(var(--accent))] px-2"/>
            <span onClick={() => setEditTitle(!editTitle)} className="flex justify-between items-center"><Check fontSize="small" className="cursor-pointer" /></span>
           </div> : 
           <div className="flex justify-between items-center gap-4 hover:opacity-75 transition-all duration-200 ease-in-out">
            <span>{title}</span>
            <span onClick={() => setEditTitle(!editTitle)} className="flex justify-between items-center"><Edit fontSize="small" className="cursor-pointer" /></span>
           </div>
          }
          <span onClick={handleClear} className="cursor-pointer px-3 bg-[hsl(var(--destructive))] hover:opacity-75 transition-all duration-300 ease-in-out text-sm">clear space <Clear /></span>
          <span onClick={handleShowDelete} className="cursor-pointer px-3 bg-[hsl(var(--destructive))] hover:opacity-75 transition-all duration-300 ease-in-out text-sm">Delete project <Clear /></span>
          <div className={` ${!showDelete && "hidden"} z-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-[hsl(var(--secondary))] rounded-md shadow-[hsl(var(--destructive))] shadow-md flex flex-col justify-center items-center gap-6`}>
          <p onClick={handleShowDelete} className="cursor-pointer px-3 bg-[hsl(var(--destructive))] hover:opacity-75">X</p>
            <p>Delete {title}?</p>
            <Button onClick={handleDelete} className="bg-[hsl(var(--destructive))]">Delete</Button>
          </div>
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
                  <div className="flex justify-between relative">
                    <div className="flex gap-2 p-1 px-4 bg-[hsl(var(--secondary))]">
                      <FontAwesomeIcon icon={faHtml5} className="text-red-500 w-4"/>
                      <h5 className="text-sm font-bold">html</h5>
                    </div>
                    <SettingsTool codeTab="htmlCode" />
                  </div>
                  <div className="flex-grow mt-2 p-2 border-x border-[hsl(var(--accent))]">
                    <CodeMirror
                      theme={tokyoNight}
                      placeholder="<h1>Welcome to caditor!</h1>"
                      value={htmlCode} 
                      height="400px"
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => dispatch(setCode({code:"htmlCode", value}))}
                    />
                  </div>
                </section>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <section className="h-full flex flex-col">
                  <div className="flex justify-between relative">
                    <div className="flex gap-2 p-1 px-4 bg-[hsl(var(--secondary))]">
                      <FontAwesomeIcon icon={faCss3Alt} className="text-blue-500 w-4"/>
                      <h5 className="text-sm font-bold">css</h5>
                    </div>
                    <SettingsTool codeTab="cssCode"/>
                  </div>
                  <div className="flex-grow mt-2 p-2">
                    <CodeMirror
                      theme={tokyoNight}
                      placeholder={cssPlaceholder}
                      value={cssCode} 
                      height="400px"
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => dispatch(setCode({code:"cssCode", value}))}
                    />
                  </div>
                </section>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <section className="h-full flex flex-col">
                  <div className="flex justify-between relative">
                    <div className="flex gap-2 p-1 px-4 bg-[hsl(var(--secondary))]">
                      <FontAwesomeIcon icon={faJs} className="text-yellow-500  w-4"/>
                      <h5 className="text-sm font-bold">js</h5>
                    </div>
                    <div className="cursor-pointer px-1">
                    <SettingsTool codeTab="jsCode" />
                    </div>
                  </div>
                  <div className="flex-grow mt-2 p-2 border-x border-[hsl(var(--accent))]">
                    <CodeMirror
                      theme={tokyoNight}
                      placeholder="console.log('Caditor!');"
                      value={jsCode}
                      height="400px"
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => dispatch(setCode({code:"jsCode", value}))}
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
            srcDoc={output}
            className="w-full h-full"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default Editor;

