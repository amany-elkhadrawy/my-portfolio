import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownToLine, ArrowRight, ExternalLink, Github, Linkedin, Mail,
  MapPin, GraduationCap, Heart, Code2, Palette, Menu, X, Phone, Award,
  Sparkles, LayoutDashboard, LogOut, Plus, Pencil, Trash2, ImagePlus,
  BriefcaseBusiness, LockKeyhole, ChevronRight, CheckCircle2, AlertCircle
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "./supabase";
import { projects as seedProjects, designStudies as seedDesigns, skills, education as seedEducation } from "./portfolioData";
import "./styles.css";

const GITHUB = "https://github.com/amany-elkhadrawy";
const LINKEDIN = "https://www.linkedin.com/in/amany-el-khadrawy";
const EMAIL = "amanyelkhadrawy283@gmail.com";
const PHONE = "01030774851";

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-heading">
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2>{title}<span className="title-dot">.</span></h2>
    {text && <p>{text}</p>}
  </div>;
}

function useContent(isAdmin = false) {
  const [projects, setProjects] = React.useState(
    isAdmin ? [] : seedProjects
  );

  const [certificates, setCertificates] = React.useState(
    isAdmin
      ? []
      : seedEducation.slice(1).map((x, i) => ({
          id: `seed-${i}`,
          title: x.title,
          issuer: x.place,
          date: x.detail,
          image_url: "",
          link: ""
        }))
  );

  const [designs, setDesigns] = React.useState(
    isAdmin
      ? []
      : seedDesigns.map((x, i) => ({
          ...x,
          id: `design-${i}`,
          image_url: "",
          link: ""
        }))
  );

  React.useEffect(() => {
    if (!isSupabaseConfigured) return;

    let alive = true;

    async function loadContent() {
      const [p, c, d] = await Promise.all([
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("certificates")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("designs")
          .select("*")
          .order("created_at", { ascending: false })
      ]);

      if (!alive) return;

      if (!p.error && p.data) { setProjects(p.data); }

      if (!c.error && c.data) { setCertificates(c.data); }

      if (!d.error && d.data) { setDesigns(d.data); }
    }

    loadContent();

    return () => {
      alive = false;
    };
  }, [isAdmin]);

  return {
    projects,
    setProjects,
    certificates,
    setCertificates,
    designs,
    setDesigns
  };
}


function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");
 const content = useContent(isAdmin);
  return isAdmin ? <AdminApp content={content}/> : <Portfolio content={content}/>;
}

function Portfolio({ content }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { projects, certificates, designs } = content;
  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">✳</span> Amany<span className="brand-period">.</span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
        {["Home","About","Skills","Projects","UI/UX","Education","Contact"].map(item=><a key={item} href={`#${item.toLowerCase().replace("/","")}`} onClick={closeMenu}>{item}</a>)}
      </nav>
      <a className="button button-dark header-cta" href="/Amany_Elkhadrawy_CV_Frontend_UIUX_Internship.pdf" download>Download CV <ArrowDownToLine size={15}/></a>
    </header>
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="hello-line"><span></span>Hello, I'm Amany</div>
          <h1>Building thoughtful<br/><span>digital experiences.</span></h1>
          <h2 className="role">Frontend Developer <b>|</b> UI/UX Designer</h2>
          <p className="hero-description">I'm a Computer Science student who enjoys turning ideas into clean, responsive web experiences and intuitive interfaces.</p>
          <div className="hero-actions"><a className="button button-dark" href="#projects">Explore my work <ArrowRight size={16}/></a><a className="button button-outline" href={`mailto:${EMAIL}`}>Let's connect <Mail size={16}/></a></div>
          <div className="social-row"><a aria-label="GitHub" href={GITHUB} target="_blank" rel="noreferrer"><Github size={19}/></a><a aria-label="LinkedIn" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={19}/></a><a aria-label="Email" href={`mailto:${EMAIL}`}><Mail size={19}/></a></div>
          <div className="hero-note"><Sparkles size={16}/> Curious by nature. Focused on thoughtful details.</div>
        </div>
        <div className="hero-visual"><div className="portrait-halo"></div><div className="portrait-frame"><img className="profile-photo" src="/profile.jpeg" alt="Amany Elkhadrawy" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextSibling.style.display="flex"}}/><div className="portrait-placeholder"><div className="portrait-initials">A<span>.</span></div><div className="portrait-label">ADD YOUR PHOTO</div></div></div><div className="floating-card"><span className="floating-icon"><Code2 size={18}/></span><div><strong>Code with purpose</strong><small>Design with empathy</small></div></div><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div></div>
      </section>
      <section className="intro-band"><div className="intro-band-inner"><span>Frontend Development</span><i>✳</i><span>UI/UX Design</span><i>✳</i><span>Continuous Learning</span><i>✳</i><span>Problem Solving</span></div></section>
      <section className="about-skills section-wrap" id="about">
        <div className="about-block"><SectionTitle eyebrow="A LITTLE ABOUT ME" title="A mix of logic & creativity"/><p className="body-copy">I'm Amany, a fourth-year Computer Science student interested in creating digital products that are useful, accessible, and visually clear. I enjoy both building interfaces with code and shaping user experiences through design.</p><div className="about-facts"><div className="fact-icon"><GraduationCap size={20}/></div><div><strong>Computer Science Student</strong><span>Expected graduation: 2027</span></div><div className="fact-icon"><MapPin size={20}/></div><div><strong>Menouf, Egypt</strong><span>Open to internship opportunities</span></div><div className="fact-icon"><Heart size={20}/></div><div><strong>What I enjoy</strong><span>Web development, UI/UX, learning new tools</span></div></div></div>
        <div className="skills-block" id="skills"><SectionTitle eyebrow="MY TOOLKIT" title="Skills & technologies"/><div className="skill-groups">{skills.map(group=><div className="skill-card" key={group.title}><div className="skill-card-heading">{group.title}</div><div className="skill-list">{group.items.map(skill=><span className="skill-chip" key={skill}>{skill}</span>)}</div></div>)}</div></div>
      </section>
      <section className="projects-section section-wrap" id="projects"><div className="section-topline"><SectionTitle eyebrow="SELECTED WORK" title="Projects I've built" text="A selection of projects that reflect my learning and practical experience."/><a className="text-link" href={GITHUB} target="_blank" rel="noreferrer">More on GitHub <ArrowRight size={15}/></a></div><div className="project-grid">{projects.map((p,i)=><article className="project-card" key={p.id||p.name}><div className={`project-art art-${(i%3)+1}`}>{p.image_url?<img src={p.image_url} alt={p.name}/>:<div className="art-placeholder"><BriefcaseBusiness size={30}/><span>{p.name}</span></div>}<span className="project-number">0{i+1}</span></div><div className="project-content"><div className="project-title-row"><h3>{p.name}</h3><span className="project-type">{p.type||"Project"}</span></div><p>{p.description}</p><div className="tag-row">{(Array.isArray(p.stack)?p.stack:(p.technologies||"").split(",").map(s=>s.trim()).filter(Boolean)).map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-links">{p.github&&<a href={p.github} target="_blank" rel="noreferrer"><Github size={15}/> View code <ExternalLink size={13}/></a>}{p.demo&&<a href={p.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={13}/></a>}</div></div></article>)}</div></section>
      <section className="design-section section-wrap" id="uiux"><div className="section-topline"><SectionTitle eyebrow="BEYOND THE CODE" title="UI/UX design" text="Design work focused on clear flows, friendly interfaces, and purposeful details."/><div className="design-badge"><Palette size={16}/> Figma & product thinking</div></div><div className="design-grid">{designs.map((d,i)=><article className="design-card" key={d.id||d.name}><div className={`design-preview design-preview-${(i%2)+1}`}>{d.image_url?<img src={d.image_url} alt={d.name}/>:<div className="design-placeholder"><Palette size={28}/><span>{d.label||"UI/UX DESIGN"}</span></div>}</div><div className="design-card-copy"><span className="eyebrow">{d.category||"UI/UX case study"}</span><h3>{d.name}</h3><p>{d.description}</p>{d.link&&<a className="text-link" href={d.link} target="_blank" rel="noreferrer">View design <ExternalLink size={13}/></a>}</div></article>)}</div></section>
      <section className="bottom-grid section-wrap" id="education"><div className="education-block"><SectionTitle eyebrow="MY BACKGROUND" title="Education & certificates"/><div className="timeline">{[{title:"B.Sc. Computer Science (in progress)",place:"Higher Institute of Technology (HTI)",date:"Expected graduation: 2027",image_url:""},...certificates].map((c,i)=><div className="timeline-item" key={c.id||c.title}><div className="timeline-icon">{i===0?<GraduationCap size={19}/>:c.image_url?<img src={c.image_url} alt=""/>:<Award size={19}/>}</div><div><h3>{c.title}</h3><p>{c.issuer||c.place}</p><span>{c.date||c.detail}</span>{c.link&&<a className="certificate-link" href={c.link} target="_blank" rel="noreferrer">View certificate ↗</a>}</div></div>)}</div></div>
        <div className="contact-card" id="contact"><div className="contact-card-top"><span className="eyebrow">HAVE A PROJECT OR OPPORTUNITY?</span><h2>Let's make something<br/><span>meaningful.</span></h2><p>I'm open to internship opportunities, collaboration, and connecting with people who love building thoughtful digital experiences.</p></div><a className="button button-light" href={`mailto:${EMAIL}`}>Get in touch <ArrowRight size={16}/></a><div className="contact-details"><a href={`mailto:${EMAIL}`}><Mail size={16}/>{EMAIL}</a><a href={`tel:${PHONE}`}><Phone size={16}/>{PHONE}</a><span><MapPin size={16}/>Menouf, Egypt</span></div></div>
      </section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">✳</span> Amany<span className="brand-period">.</span></a><p>Designed with intention. Built with care.</p><div className="footer-social"><a href={GITHUB} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={17}/></a><a href={LINKEDIN} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={17}/></a><a href={`mailto:${EMAIL}`} aria-label="Email"><Mail size={17}/></a><a href="/admin" aria-label="Admin dashboard"><LockKeyhole size={16}/></a></div><small>© {new Date().getFullYear()} Amany Elkhadrawy</small></footer>
  </div>;
}

function AdminApp({ content }) {
  const [session, setSession] = React.useState(null);
  const [checking, setChecking] = React.useState(true);
  const [tab, setTab] = React.useState("projects");
  const [busy, setBusy] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const [form, setForm] = React.useState({});
  const [editing, setEditing] = React.useState(null);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [auth, setAuth] = React.useState({email:"",password:""});
  React.useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({data})=>{setSession(data.session);setChecking(false);});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>setSession(s));
    return ()=>subscription.unsubscribe();
  }, []);
  const configMissing = !isSupabaseConfigured;
  const rows = tab==="projects" ? content.projects : tab==="certificates" ? content.certificates : content.designs;
  const table = tab;
  const setRows = tab==="projects" ? content.setProjects : tab==="certificates" ? content.setCertificates : content.setDesigns;
  const blank = () => tab==="projects" ? {name:"",type:"Web application",description:"",technologies:"",github:"",demo:"",image_url:""} : tab==="certificates" ? {title:"",issuer:"",date:"",link:"",image_url:""} : {name:"",category:"UI/UX case study",description:"",link:"",image_url:"",label:""};
  const startAdd = () => { setEditing("new"); setForm(blank()); setUploadFile(null); setNotice(""); };
  const startEdit = row => { setEditing(row.id); setForm({...row, technologies:Array.isArray(row.stack)?row.stack.join(", "):(row.technologies||"")}); setUploadFile(null); setNotice(""); };
  const uploadImage = async () => {
    if (!uploadFile) return form.image_url||"";
    const ext = uploadFile.name.split(".").pop().toLowerCase();
    const path = `${tab}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const {error}=await supabase.storage.from("portfolio-media").upload(path,uploadFile,{upsert:false,contentType:uploadFile.type});
    if(error) throw error;
    const {data}=supabase.storage.from("portfolio-media").getPublicUrl(path);
    return data.publicUrl;
  };
  const save = async e => {
    e.preventDefault(); setBusy(true); setNotice("");
    try {
      if (!supabase) throw new Error("Supabase is not configured yet. Follow SETUP-AR.md first.");
      const image_url=await uploadImage();
      let payload={...form,image_url};
      delete payload.id; delete payload.created_at;
      if(tab==="projects") { payload.stack=(form.technologies||"").split(",").map(s=>s.trim()).filter(Boolean); delete payload.technologies; }
      const {data,error}=editing==="new"
        ? await supabase.from(table).insert(payload).select().single()
        : await supabase.from(table).update(payload).eq("id",editing).select().single();
      if(error) throw error;
      if(editing==="new") setRows([data,...rows]); else setRows(rows.map(r=>r.id===editing?data:r));
      setEditing(null); setUploadFile(null); setNotice("Saved successfully. The portfolio content has been updated.");
    } catch(err) { setNotice(err.message||"Something went wrong."); }
    finally { setBusy(false); }
  };
 const remove = async row => {
  if (!row.id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(row.id)) {
    setNotice("This is sample data, not a saved database record.");
    return;
  }

  if (!window.confirm(`Delete "${row.name || row.title}"? This cannot be undone.`)) {
    return;
  }

  try {
    if (!supabase) {
      throw new Error("Supabase is not configured.");
    }

    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", row.id);

    if (error) throw error;

    setRows(previousRows => previousRows.filter(item => item.id !== row.id));
    setNotice("Item deleted.");
  } catch (err) {
    setNotice(err.message || "Delete failed.");
  }
};
  const signIn = async e => {
    e.preventDefault(); setBusy(true); setNotice("");
    try {
      if(!supabase) throw new Error("Complete Supabase setup first using SETUP-AR.md.");
      const {error}=await supabase.auth.signInWithPassword(auth);
      if(error) throw error;
    } catch(err) { setNotice(err.message||"Could not sign in."); }
    finally { setBusy(false); }
  };
  if(checking) return <div className="admin-loading">Loading dashboard…</div>;
  if(configMissing) return <div className="setup-screen"><div className="setup-card"><div className="admin-brand"><span className="brand-mark">✳</span> Amany<span className="brand-period">.</span> <small>ADMIN</small></div><div className="setup-icon"><LayoutDashboard size={27}/></div><h1>Let's connect your dashboard</h1><p>The admin interface is ready, but online editing needs a Supabase project for secure login, database records, and image storage.</p><ol><li>Open the included <b>SETUP-AR.md</b> guide.</li><li>Create a free Supabase project.</li><li>Copy the Project URL and publishable/anon key into <code>.env.local</code>.</li><li>Run the SQL script from the guide, then restart the dev server.</li></ol><p className="warning-note"><AlertCircle size={16}/> Do not put a Supabase service-role key in frontend code.</p><a className="button button-dark" href="/">Back to portfolio <ArrowRight size={15}/></a></div></div>;
  if(!session) return <div className="admin-login"><form className="login-card" onSubmit={signIn}><a className="brand" href="/"><span className="brand-mark">✳</span> Amany<span className="brand-period">.</span></a><span className="eyebrow">PRIVATE ADMIN AREA</span><h1>Welcome back.</h1><p>Sign in to manage your portfolio content.</p><label>Email address<input type="email" autoComplete="username" required value={auth.email} onChange={e=>setAuth({...auth,email:e.target.value})}/></label><label>Password<input type="password" autoComplete="current-password" required value={auth.password} onChange={e=>setAuth({...auth,password:e.target.value})}/></label>{notice&&<div className="notice error"><AlertCircle size={15}/>{notice}</div>}<button className="button button-dark login-submit" disabled={busy}>{busy?"Signing in…":"Sign in"} <ArrowRight size={15}/></button><a className="back-link" href="/">← Back to portfolio</a></form></div>;
  return <div className="admin-layout"><aside className="admin-sidebar"><a className="brand" href="/"><span className="brand-mark">✳</span> Amany<span className="brand-period">.</span></a><div className="admin-side-label">WORKSPACE</div>{[{id:"overview",label:"Overview",icon:<LayoutDashboard size={17}/>},{id:"projects",label:"Projects",icon:<BriefcaseBusiness size={17}/>},{id:"certificates",label:"Certificates",icon:<Award size={17}/>},{id:"designs",label:"UI/UX Designs",icon:<Palette size={17}/>}].map(item=><button key={item.id} className={`admin-nav-item ${tab===item.id?"active":""}`} onClick={()=>{setTab(item.id==="overview"?"projects":item.id);setEditing(null);setNotice("");}}>{item.icon}{item.label}<ChevronRight size={14}/></button>)}<div className="admin-sidebar-bottom"><a href="/" target="_blank" rel="noreferrer">View live portfolio ↗</a><button onClick={()=>supabase.auth.signOut()}><LogOut size={16}/> Sign out</button></div></aside>
    <main className="admin-main"><div className="admin-topbar"><div><span className="eyebrow">PORTFOLIO MANAGEMENT</span><h1>{tab==="projects"?"Projects":tab==="certificates"?"Certificates":tab==="designs"?"UI/UX designs":"Overview"}</h1></div><div className="admin-user"><div className="admin-avatar">A</div><div><strong>Amany</strong><span>Administrator</span></div></div></div>
      <div className="admin-stats"><div><span>Projects</span><strong>{content.projects.length}</strong><BriefcaseBusiness size={20}/></div><div><span>Certificates</span><strong>{content.certificates.length}</strong><Award size={20}/></div><div><span>UI/UX designs</span><strong>{content.designs.length}</strong><Palette size={20}/></div></div>
      {notice&&<div className={`notice ${notice.includes("successfully")||notice==="Item deleted."?"success":"error"}`}>{notice.includes("successfully")||notice==="Item deleted."?<CheckCircle2 size={16}/>:<AlertCircle size={16}/>} {notice}</div>}
      {editing!==null ? <section className="admin-panel"><div className="panel-header"><div><span className="eyebrow">{editing==="new"?"NEW ITEM":"EDIT ITEM"}</span><h2>{editing==="new"?"Add new item":"Edit details"}</h2></div><button className="button button-outline" onClick={()=>setEditing(null)}>Cancel</button></div><form className="admin-form" onSubmit={save}>
        {(tab==="projects"?[{key:"name",label:"Project name",required:true},{key:"type",label:"Project type"},{key:"description",label:"Description",required:true,area:true},{key:"technologies",label:"Technologies (comma separated)"},{key:"github",label:"GitHub URL"},{key:"demo",label:"Live demo URL"}]:tab==="certificates"?[{key:"title",label:"Certificate name",required:true},{key:"issuer",label:"Issuing organization"},{key:"date",label:"Date / details"},{key:"link",label:"Certificate URL"}]:[{key:"name",label:"Design name",required:true},{key:"category",label:"Category"},{key:"description",label:"Description",required:true,area:true},{key:"label",label:"Preview label"},{key:"link",label:"Figma / project URL"}]).map(field=><label key={field.key} className={field.area?"full-field":""}>{field.label}{field.area?<textarea rows="4" required={field.required} value={form[field.key]||""} onChange={e=>setForm({...form,[field.key]:e.target.value})}/>:<input type="text" required={field.required} value={form[field.key]||""} onChange={e=>setForm({...form,[field.key]:e.target.value})}/>}</label>)}
        <label className="full-field">Image {form.image_url&&<span className="image-current">Current image saved</span>}<span className="upload-control"><ImagePlus size={19}/><span>{uploadFile?uploadFile.name:"Choose an image from your device"}</span><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e=>setUploadFile(e.target.files?.[0]||null)}/></span><small>Images are uploaded to the Supabase Storage bucket `portfolio-media`.</small></label>
        <div className="form-actions full-field"><button className="button button-dark" disabled={busy}>{busy?"Saving…":editing==="new"?"Add item":"Save changes"} <CheckCircle2 size={15}/></button></div>
      </form></section> : <section className="admin-panel"><div className="panel-header"><div><span className="eyebrow">CONTENT LIBRARY</span><h2>Manage {tab}</h2></div><button className="button button-dark" onClick={startAdd}><Plus size={16}/> Add new</button></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Item</th><th>Details</th><th>Image</th><th>Actions</th></tr></thead><tbody>{rows.map(row=><tr key={row.id||row.name}><td><strong>{row.name||row.title}</strong><span>{row.type||row.category||row.issuer||"Portfolio item"}</span></td><td className="row-description">{row.description||row.date||row.link||"—"}</td><td>{row.image_url?<img className="table-thumb" src={row.image_url} alt=""/>:<span className="no-image">No image</span>}</td><td><div className="row-actions"><button aria-label="Edit" onClick={()=>startEdit(row)}><Pencil size={15}/></button><button aria-label="Delete" className="delete-action" onClick={()=>remove(row)}><Trash2 size={15}/></button></div></td></tr>)}</tbody></table>{rows.length===0&&<div className="empty-state">No items yet. Click “Add new” to create your first one.</div>}</div></section>}
      <div className="admin-footer-note"><LockKeyhole size={14}/> Admin access is protected by Supabase Authentication and database policies.</div>
    </main></div>;
}

createRoot(document.getElementById("root")).render(<App/>);