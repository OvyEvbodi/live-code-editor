import Editor from './components/Editor';
import { Button } from '@/components/ui/button';

const NewProjectPage = () => {
  return (
    <main>
      <div className="flex justify-between mb-2">
        <h1>New Project +</h1>
        <Button className='px-20 bg-[hsl(var(--accent))]'>Save</Button>
      </div>
      
      <Editor />
    </main>
  )
}

export default NewProjectPage;