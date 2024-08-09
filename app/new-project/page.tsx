import Logo from '@/components/Logo';
import Editor from './components/Editor';
import { Button } from '@/components/ui/button';

const NewProjectPage = () => {
  return (
    <main>
      <div className="flex justify-between mb-1">
        <Logo />
      </div>
      <Editor />
    </main>
  )
}

export default NewProjectPage;