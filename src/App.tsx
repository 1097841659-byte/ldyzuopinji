import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Mail, 
  Phone, 
  ArrowRight, 
  Menu, 
  X,
  Award,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { PROJECTS, Project } from './constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About / 关于', href: '#about' },
    { name: 'Works / 项目', href: '#projects' },
    { name: 'Contact / 联系', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${isScrolled ? 'py-6 glass' : 'py-12 bg-transparent'}`}>
      <div className="max-w-[1800px] mx-auto px-10 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-display font-bold tracking-[-0.05em] uppercase"
        >
          LIN DAN YI<span className="text-ink/20 ml-2 font-light">Portfolio</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-16">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-micro hover:text-ink transition-luxury relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-ink transition-all duration-700 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-ink" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-white pt-40 px-10"
          >
            <div className="flex flex-col space-y-12">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-6xl font-display font-bold tracking-tighter uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProjectCard = ({ project, index, onClick }: { project: Project, index: number, onClick: () => void, key?: string }) => {
  return (
    <motion.div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden aspect-[4/3] bg-gray-100 border border-black/5"
      whileHover="hover"
    >
      <motion.img
        src={project.images[0]}
        alt={project.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
      />
      
      <div className="absolute top-4 left-4 text-[10px] font-mono opacity-40 group-hover:opacity-100 transition-opacity text-white mix-blend-difference">
        0{index + 1}
      </div>

      <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-luxury duration-500 flex flex-col justify-end p-8 text-white">
        <span className="text-[10px] uppercase tracking-widest mb-2 opacity-60">{project.category}</span>
        <h3 className="text-2xl font-display font-bold tracking-tighter">{project.title}</h3>
        <div className="mt-4 flex items-center text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          View Details <ArrowUpRight className="ml-1 w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
};

const MaskReveal = ({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) => {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: isOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      {children}
    </motion.div>
  );
};

const GrowthAnimation = () => {
  return (
    <div className="relative w-full aspect-video bg-gray-light rounded-2xl overflow-hidden flex items-center justify-center">
      <svg width="400" height="300" viewBox="0 0 400 300" className="opacity-40">
        {/* Axis Lines */}
        <motion.line 
          x1="50" y1="150" x2="350" y2="150" 
          stroke="black" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.line 
          x1="200" y1="50" x2="200" y2="250" 
          stroke="black" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
        
        {/* Furniture Modules */}
        <motion.rect 
          x="100" y="100" width="60" height="40" 
          fill="none" stroke="black" strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        <motion.rect 
          x="240" y="160" width="60" height="40" 
          fill="none" stroke="black" strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        
        {/* Circulation Path */}
        <motion.path 
          d="M 130 140 Q 200 200 270 160" 
          fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-micro opacity-20 uppercase tracking-widest">Generative Logic</span>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      <MaskReveal isOpen={!!project}>
        <button 
          onClick={onClose}
          className="fixed top-12 right-12 z-[110] p-4 rounded-full bg-black text-white hover:scale-110 transition-luxury"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-[1800px] mx-auto">
          {/* Full Screen Header */}
          <section className={`${project.id === 'fission-space' ? 'aspect-[1.5/1]' : 'h-screen'} relative overflow-hidden`}>
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={project.images[0]} 
              className="w-full h-full object-cover cursor-zoom-in"
              referrerPolicy="no-referrer"
              onClick={() => setZoomedImage(project.images[0])}
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <div className={`${project.id === 'fission-space' ? 'top-12 right-32 text-right' : 'bottom-24 left-12 md:left-24'} absolute text-white pointer-events-none`}>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-micro text-white/60 mb-4 block"
              >
                {project.category} / {project.year}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${project.id === 'fission-space' ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-display font-bold tracking-tighter leading-none`}
              >
                {project.title}
              </motion.h2>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-40 px-12 md:px-24 max-w-6xl mx-auto">
            {/* Text Content: Header & Description */}
            <div className="mb-32">
              <h3 className="text-micro mb-12 opacity-40 uppercase tracking-widest">Concept & Narrative</h3>
              <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter mb-12 leading-[1.1]">
                {project.subtitle}
              </p>
              <div className="h-px w-24 bg-ink mb-12" />
              <p className="text-xl text-ink/60 font-light leading-relaxed mb-16 max-w-3xl">
                {project.description}
              </p>
            </div>
            
            {/* Images Section: Now in the middle */}
            <div className="space-y-32 mb-32">
              {project.images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="overflow-hidden group cursor-zoom-in shadow-2xl shadow-black/5"
                  onClick={() => setZoomedImage(img)}
                >
                  <div className="relative overflow-hidden aspect-auto">
                    <img 
                      src={img} 
                      className="w-full h-auto transition-luxury duration-1000 group-hover:scale-105" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Content: Coordinates & Tags */}
            <div className="pt-20 border-t border-black/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                <div>
                  <span className="text-micro block mb-4 opacity-40 uppercase tracking-widest">Coordinates / 坐标</span>
                  <span className="text-lg font-medium">{project.location}</span>
                </div>
                <div>
                  <span className="text-micro block mb-4 opacity-40 uppercase tracking-widest">Status / 状态</span>
                  <span className="text-lg font-medium">{project.status}</span>
                </div>
                <div>
                  <span className="text-micro block mb-4 opacity-40 uppercase tracking-widest">Year / 年份</span>
                  <span className="text-lg font-medium">{project.year}</span>
                </div>
                <div>
                  <span className="text-micro block mb-4 opacity-40 uppercase tracking-widest">Category / 类别</span>
                  <span className="text-lg font-medium">{project.category}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-gray-100 text-[10px] uppercase tracking-widest rounded-full opacity-60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <section className="py-24 px-12 md:px-24 border-t border-black/5 flex justify-between items-center">
            <button onClick={onClose} className="text-micro hover:text-ink transition-luxury flex items-center gap-4">
              <ArrowRight className="rotate-180 w-4 h-4" /> Back to Index
            </button>
            <span className="text-micro">Lin Danyi © 2025</span>
          </section>
        </div>
      </MaskReveal>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-2 md:p-4 cursor-zoom-out"
          >
            <motion.button
              className="absolute top-8 right-8 z-[210] text-white/40 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
              onClick={() => setZoomedImage(null)}
            >
              <X size={24} />
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              src={zoomedImage}
              alt="Enlarged view"
              className="max-w-[98vw] max-h-[98vh] object-contain shadow-2xl select-none"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = x / rect.width;
    const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: progress * scrollWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen selection:bg-ink selection:text-white">
      <Navbar />

      {/* Hero Section - Immersive & Minimal */}
      <section className="h-screen flex items-center justify-center px-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-micro mb-12 block">Environmental Design | Spatial Narrative</span>
            <h1 className="text-display mb-12 flex flex-col items-center">
              <span>LIN DAN YI</span>
              <span className="text-[2.5vw] font-light opacity-20 tracking-[1em] mt-4 ml-[1em]">林丹沂</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
              <p className="text-micro text-center md:text-left">
                Email : ldy0409@163.com
              </p>
              <div className="h-px w-12 bg-ink/20 hidden md:block" />
              <p className="text-micro text-center md:text-right">
                Phone : 13699232154
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-16 left-10 text-micro"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* About Section - Resume Style */}
      <section id="about" className="min-h-screen flex items-start px-10 py-32 bg-white">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-20 items-start">
          
          {/* Left Column: Profile, Contact, Intro */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              {/* Enlarged Square Photo */}
              <div className="w-full max-w-[320px] aspect-square bg-gray-light overflow-hidden rounded-2xl mb-8 relative group">
                <img 
                  src="/images/1.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-luxury duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h2 className="text-4xl font-display font-bold tracking-tight mb-6">林丹沂</h2>
              
              <div className="space-y-3 text-sm text-ink/60 font-light">
                <div className="flex items-center justify-center gap-2">
                  <Phone size={14} className="opacity-40" />
                  <span>13699232154</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail size={14} className="opacity-40" />
                  <a href="mailto:ldy0409@163.com" className="hover:text-ink transition-colors">ldy0409@163.com</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Resume Details */}
          <div className="lg:col-span-7 lg:col-start-6 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-16"
            >
              {/* Basic Info */}
              <section>
                <h3 className="text-xl font-display font-bold mb-8 text-ink flex items-center gap-3">
                  <span className="w-8 h-px bg-ink/20"></span>
                  基础信息
                </h3>
                <div className="grid md:grid-cols-2 gap-y-4 gap-x-12 text-sm">
                  <div className="flex justify-between border-b border-black/5 pb-2">
                    <span className="opacity-40">姓名</span>
                    <span className="font-medium">林丹沂</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-2">
                    <span className="opacity-40">政治面貌</span>
                    <span className="font-medium">中共党员</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-2 md:col-span-2">
                    <span className="opacity-40">本科</span>
                    <span className="font-medium">北京建筑大学 · 环境设计专业</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-2 md:col-span-2">
                    <span className="opacity-40">硕士</span>
                    <span className="font-medium">北京建筑大学 · 设计学专业 (在读)</span>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-xl font-display font-bold mb-8 text-ink flex items-center gap-3">
                  <span className="w-8 h-px bg-ink/20"></span>
                  技能软件
                </h3>
                <div className="grid md:grid-cols-2 gap-12 text-sm">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-micro mb-2 opacity-40">平面排版</h4>
                      <p className="font-medium leading-relaxed">熟练运用 Ps, Ai, Id 等，能够熟练使用 PS, AI 完成海报等视觉设计，使用 ID 进行系统化排版。</p>
                    </div>
                    <div>
                      <h4 className="text-micro mb-2 opacity-40">建模渲染</h4>
                      <p className="font-medium leading-relaxed">熟练运用 SketchUp, Rhino, CAD, 3DSMAX 等，能够快速建立场景模型。</p>
                    </div>
                    <div>
                      <h4 className="text-micro mb-2 opacity-40">办公软件</h4>
                      <p className="font-medium leading-relaxed">精通 Office 办公套件（Word/Excel/PowerPoint），能高效处理文档及数据。</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-micro mb-2 opacity-40">AI 辅助设计</h4>
                      <p className="font-medium leading-relaxed">关注 AI 绘图趋势，具有 Midjourney, Stable Diffusion, 既梦等工具使用经验，能够利用其快速生成设计素材，辅助创意提案，生成场景效果。</p>
                    </div>
                    <div>
                      <h4 className="text-micro mb-2 opacity-40">语言能力</h4>
                      <p className="font-medium leading-relaxed">通过 CET-4（大学英语四级）和 CET-6（大学英语六级）考试。</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Awards */}
              <section>
                <h3 className="text-xl font-display font-bold mb-8 text-ink flex items-center gap-3">
                  <span className="w-8 h-px bg-ink/20"></span>
                  获奖经历
                </h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-micro mb-4 opacity-40">国际级</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>2024年 FourC Challenge 全球挑战赛二等奖</span>
                        <span className="text-xs opacity-40">参赛作品前8%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-micro mb-4 opacity-40">国家级</h4>
                    <div className="text-sm space-y-4">
                      <div className="flex justify-between">
                        <span>2025年 未来设计师全国高校数字艺术设计大赛二等奖</span>
                        <span className="text-xs opacity-40">参赛作品前5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2024年 全国适老化设计大赛银奖</span>
                        <span className="text-xs opacity-40">参赛作品前3%</span>
                      </div>
                      <p>2022年 第21届“新人杯”全国大学生室内设计竞赛优秀奖</p>
                      <p>2021年 学院杯中国室内与环境设计大赛室内组、景观组优秀奖</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-micro mb-4 opacity-40">校级</h4>
                    <div className="text-sm space-y-4">
                      <p>作为队长带领组员获得“鲁班杯”大学生课外学术科技作品竞赛一等奖</p>
                      <p>本科研究生连续五年获得学校奖学金（专业前5%）</p>
                      <p>成绩常年稳定在年级前3%</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Internships */}
              <section>
                <h3 className="text-xl font-display font-bold mb-8 text-ink flex items-center gap-3">
                  <span className="w-8 h-px bg-ink/20"></span>
                  实习经历
                </h3>
                <div className="space-y-12">
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-base">中建一局华江公司</h4>
                      <span className="text-xs opacity-40">设计实习生</span>
                    </div>
                    <p className="text-sm text-ink/60 leading-relaxed font-light">
                      参与住宅项目的方案设计工作，协助主创设计师完成平面布局优化及立面造型设计，运用 AutoCAD 绘制图纸 20+ 张。制作多套完整项目汇报 PPT，协助完成方案汇报演示，成功获得甲方认可。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-base">才度文化公司</h4>
                      <span className="text-xs opacity-40">舞美设计助理</span>
                    </div>
                    <p className="text-sm text-ink/60 leading-relaxed font-light">
                      协助完成节目舞台改造，从概念设计到现场落地协调，确保项目按时高质量完成。协助完成两场主题活动设计，通过优化布局和舞台结构，使观众满意度提升。运用 AI 生成不同风格视觉提案，提升设计效率。辅助主设计师完成方案深化、建模及现场搭建工作，确保设计方案完美呈现。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-base">华人文化公司 (CMC Inc.)</h4>
                      <span className="text-xs opacity-40">设计助理</span>
                    </div>
                    <p className="text-sm text-ink/60 leading-relaxed font-light">
                      负责戏剧项目视觉设计工作，涵盖宣传海报、戏剧周边产品、公众号长图等多平台视觉内容，独立完成多个项目视觉设计，与项目组建立良好合作关系。
                    </p>
                  </div>
                </div>
              </section>

              {/* Projects */}
              <section>
                <h3 className="text-xl font-display font-bold mb-8 text-ink flex items-center gap-3">
                  <span className="w-8 h-px bg-ink/20"></span>
                  项目经历
                </h3>
                <div className="space-y-10">
                  <div className="space-y-3">
                    <h4 className="font-medium text-base">北京市百千工程村落视觉环境提升</h4>
                    <p className="text-sm text-ink/60 leading-relaxed font-light">
                      包括村庄整体形象设计及衍生，产品包装，打卡景观等，工作内容包括村庄内涵挖掘，村庄需求调研，平面及环境设计，村庄政府对接等，参与创意提案-风格设定-视觉设计-制作推广的完整流。目前3个村庄已完成落地并开始使用售卖，获得北京市共青团等官方官网及公众号推广。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-base">北京市丰台区北宫镇群众接待中心改造设计</h4>
                    <p className="text-sm text-ink/60 leading-relaxed font-light">
                      参与全流程设计执行，完成空间规划、文化墙装饰及标识系统设计，方案落地后获区级优秀表彰。通过20+次居民访谈明确功能需求，采用模块化设计优化服务动线，使空间利用率提升40%。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-base">北京市丰台区红山郡社区服务中心改造设计</h4>
                      <span className="text-xs opacity-40">适老化专项</span>
                    </div>
                    <p className="text-sm text-ink/60 leading-relaxed font-light">
                      为适老化专项设计，运用无障碍设计规范改造1500㎡空间，联合街道办开展3轮需求调研，完成服务中心标识系统设计居民满意度增强80%，高效项目协作，协调施工方完成改造，确保设计方案还原度。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-base">校学生会团务中心</h4>
                      <span className="text-xs opacity-40">干事</span>
                    </div>
                    <p className="text-sm text-ink/60 leading-relaxed font-light">
                      主导策划 2 场校级大型活动（参与人数 500+），负责活动构思、内容执行及视觉设计。运用 PS/AI 完成主视觉海报，通过公众号及社群宣传使活动线上曝光量提升 40%。
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section - Horizontal Snap Gallery */}
      <section id="projects" className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-10 mb-16 flex justify-between items-end">
          <div>
            <span className="text-micro mb-4 block">Portfolio</span>
            <h2 className="text-6xl md:text-8xl tracking-tighter">Selected Works</h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="hidden md:flex gap-4 mb-4">
            <button 
              onClick={() => scrollContainerRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
              className="p-4 border border-ink/10 rounded-full hover:bg-ink hover:text-white transition-all duration-500 group"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => scrollContainerRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
              className="p-4 border border-ink/10 rounded-full hover:bg-ink hover:text-white transition-all duration-500 group"
              aria-label="Next project"
            >
              <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container - Two Rows */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-10 pb-12"
          style={{ scrollPadding: '2.5rem' }}
        >
          <div className="flex flex-col gap-12">
            {/* Row 1 */}
            <div className="flex gap-6">
              {PROJECTS.filter((_, i) => i % 2 === 0).map((project, idx) => (
                <motion.div
                  key={project.id}
                  className="min-w-[42vw] md:min-w-[320px] lg:min-w-[380px] snap-start"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <ProjectCard 
                    index={idx * 2}
                    project={project} 
                    onClick={() => setSelectedProject(project)} 
                  />
                  <div className="mt-4 flex justify-between items-start">
                    <div className="max-w-[85%]">
                      <h3 className="text-lg md:text-xl font-display font-bold tracking-tight leading-tight">{project.title}</h3>
                      <p className="text-[10px] md:text-xs opacity-40 mt-1 font-light line-clamp-1">{project.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] opacity-20 block">{project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Row 2 */}
            <div className="flex gap-6 ml-12 md:ml-24">
              {PROJECTS.filter((_, i) => i % 2 !== 0).map((project, idx) => (
                <motion.div
                  key={project.id}
                  className="min-w-[42vw] md:min-w-[320px] lg:min-w-[380px] snap-start"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <ProjectCard 
                    index={idx * 2 + 1}
                    project={project} 
                    onClick={() => setSelectedProject(project)} 
                  />
                  <div className="mt-4 flex justify-between items-start">
                    <div className="max-w-[85%]">
                      <h3 className="text-lg md:text-xl font-display font-bold tracking-tight leading-tight">{project.title}</h3>
                      <p className="text-[10px] md:text-xs opacity-40 mt-1 font-light line-clamp-1">{project.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] opacity-20 block">{project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Spacer for end of scroll */}
          <div className="min-w-[15vw] h-full flex-shrink-0" />
        </div>

        {/* Visual Progress Bar */}
        <div className="max-w-[1800px] mx-auto px-10 mt-8">
          <div 
            onClick={handleProgressClick}
            className="h-4 flex items-center cursor-pointer group"
          >
            <div className="h-px w-full bg-gray-100 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-ink"
                style={{ 
                  width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
                  scaleX: useTransform(smoothProgress, [0, 1], [0.1, 1]),
                  originX: 0
                }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] uppercase tracking-[0.2em] opacity-20 font-bold">
            <span>01 / Start</span>
            <span>{PROJECTS.length.toString().padStart(2, '0')} / End</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 px-10 bg-ink text-white">
        <div className="max-w-[1800px] mx-auto">
          <span className="text-micro text-white/40 mb-12 block">Inquiry</span>
          <h2 className="text-[10vw] leading-none tracking-tighter mb-32">
            Let's build<br />the future.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-20 items-end">
            <div className="space-y-4">
              <span className="text-micro text-white/40 block">Email</span>
              <a href="mailto:ldy0409@163.com" className="text-2xl font-display hover:text-white/60 transition-luxury">ldy0409@163.com</a>
            </div>
            <div className="space-y-4">
              <span className="text-micro text-white/40 block">Phone</span>
              <span className="text-2xl font-display">13699232154</span>
            </div>
            <div className="flex gap-8 justify-end">
              <a href="#" className="text-micro hover:text-white/60 transition-luxury">Behance</a>
              <a href="#" className="text-micro hover:text-white/60 transition-luxury">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail View */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
