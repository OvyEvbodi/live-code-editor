import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Logo = () => {
  return (
    <div className='text-zinc-300 pb-2 font-extrabold tracking-tight text-xl max-h-7 overflow-hidden'>
      <Link href="/projects">Ca<span className='text-[hsl(var(--accent))]'>d</span>itor
      <FontAwesomeIcon icon={faCat} className="px-2 text-2xl" />
      </Link>
    </div>
  )
}

export default Logo;