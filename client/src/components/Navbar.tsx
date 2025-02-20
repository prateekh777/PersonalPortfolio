import { Link } from "wouter";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-medium">Portfolio</a>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/expertise"><a className="hover:text-primary transition-colors">Expertise</a></Link>
          <Link href="/case-studies"><a className="hover:text-primary transition-colors">Case Studies</a></Link>
          <Link href="/projects"><a className="hover:text-primary transition-colors">Projects</a></Link>
          <Link href="/ai-works"><a className="hover:text-primary transition-colors">AI Works</a></Link>
          <Link href="/interests"><a className="hover:text-primary transition-colors">Interests</a></Link>
          <Link href="/contact"><a className="hover:text-primary transition-colors">Contact</a></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
