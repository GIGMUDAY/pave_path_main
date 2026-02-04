import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle2, ArrowRight, FileText, Settings, ShieldCheck, Target, Ruler, ClipboardCheck, Users, Clock, Wrench, Package, Calendar, Layers, Search, ClipboardList, Calculator, X } from 'lucide-react';

const UseCase = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            setIsModalOpen(false);
        }, 3000);
    };

    const scrollToContact = () => {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="section-container mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">Case Study</span>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-[1.1]">
                            ADA Curb Ramp <span className="text-secondary">Transition Plan</span>
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            How PavePath helped a regional firm clear a massive backlog of curb ramp drafting tasks with
                            precision, speed, and full compliance.
                        </p>
                    </motion.div>
                </section>

                {/* Project Overview Section */}
                <section className="section-container mb-24">
                    <div className="bg-muted/50 rounded-2xl p-8 border border-border/50">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                                    <FileText className="text-secondary w-6 h-6" />
                                    Project Overview
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Duration</span>
                                        <p className="text-foreground font-medium">4 weeks (Oct 2 – Oct 30, 2025)</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Location</span>
                                        <p className="text-foreground font-medium">California</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Client Type</span>
                                        <p className="text-foreground font-medium">Municipal Public Works Department</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-display text-xl font-bold text-foreground opacity-0 pointer-events-none">Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Service Provided</span>
                                        <p className="text-foreground font-medium">ADA/PROWAG Curb Ramp Design Package</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Timeline</span>
                                        <p className="text-foreground font-medium">Start: Oct 2 • Completion: Oct 30 • Turnaround: 28 days</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1 md:col-span-2">
                                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-secondary/20 shadow-sm h-full">
                                    <span className="text-xs font-bold uppercase tracking-wider text-secondary block mb-2">Scope</span>
                                    <p className="text-foreground leading-relaxed">
                                        Design <strong>52 survey-based ADA-compliant curb ramps</strong> across 8 city blocks to meet ADA Transition Plan deadlines and secure Caltrans Active Transportation Program grant funding.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Problem Section */}
                <section className="bg-accent/20 dark:bg-accent/10 py-16 mb-16">
                    <div className="section-container grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-display text-3xl font-bold mb-6 text-foreground">Challenge</h2>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                The City faced a critical deadline to complete curb ramp designs for their ADA Transition Plan. With limited in-house CAD capacity and a 4-week window before the Caltrans ATP grant funding deadline, they needed a partner who could:
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Deliver 52 ramp designs with PROWAG-compliant detailing",
                                    "Incorporate field survey data and topographic constraints",
                                    "Meet Caltrans and City of Riverside CAD standards",
                                    "Pass city plan check on first submittal with zero corrections",
                                    "Complete all work within grant funding timeline"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground font-medium">
                                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-secondary" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl">
                                <h3 className="font-display text-lg font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                                    <span>⚠️</span> Critical Constraint
                                </h3>
                                <p className="text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
                                    <strong>Grant funding deadline: Oct 30, 2025.</strong> Missing this date would forfeit in ATP funding and delay the city's ADA compliance schedule by 18 months.
                                </p>
                            </div>
                        </motion.div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1503387762-592dee58c160?w=800&q=80"
                                alt="Engineering blueprint"
                                className="w-full h-full object-cover aspect-video"
                            />
                        </div>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="section-container mb-24">
                    <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
                        <div className="lg:w-1/3">
                            <span className="text-secondary font-bold text-sm uppercase tracking-widest mb-4 block">Solution</span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                                ADA Transportation Pod
                            </h2>
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                    <ShieldCheck className="text-secondary w-5 h-5" />
                                    PavePath's Approach
                                </h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Deployed a dedicated Transportation Pod with PE oversight, trained CAD specialists, and stage-gated QA/QC at 30%, 60%, and 90% milestones.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                                        <span className="text-sm font-medium text-muted-foreground">Team Composition</span>
                                        <span className="text-sm font-bold text-foreground">1 PM + 3 CAD + PE</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                                        <span className="text-sm font-medium text-muted-foreground">QA/QC Method</span>
                                        <span className="text-sm font-bold text-foreground">Stage-Gated</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm font-medium text-muted-foreground">Milestones</span>
                                        <span className="text-sm font-bold text-foreground">30/60/90%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 space-y-8">
                            <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                                PavePath's Transportation Pod worked in close coordination with the City's engineering department across three distinct phases:
                            </p>

                            <div className="space-y-12">
                                {/* Week 1 */}
                                <div className="relative pl-12">
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm z-10">1</div>
                                    <div className="absolute left-4 top-8 bottom-[-48px] w-px bg-border hidden md:block"></div>
                                    <h4 className="font-display text-xl font-bold mb-4 text-foreground">Week 1: Standards Alignment & Base Setup</h4>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {[
                                            "Onboarded to City of Riverside CAD standards and layer structure",
                                            "Loaded field survey data and existing base files",
                                            "Established review cadence with city PM (twice weekly)",
                                            "Validated PROWAG compliance checklist with city ADA coordinator"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-2 text-muted-foreground text-sm leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Weeks 2-3 */}
                                <div className="relative pl-12">
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm z-10">2-3</div>
                                    <div className="absolute left-4 top-8 bottom-[-48px] w-px bg-border hidden md:block"></div>
                                    <h4 className="font-display text-xl font-bold mb-4 text-foreground">Weeks 2-3: Production & QA/QC Gates</h4>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {[
                                            "Designed ramp layouts with detectable warning surfaces and landing slopes",
                                            "Incorporated utility coordination (storm drain, water, electrical)",
                                            "Passed internal 30%, 60%, and 90% QA reviews using Bluebeam",
                                            "Delivered constructability review notes for field verification"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-2 text-muted-foreground text-sm leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Week 4 */}
                                <div className="relative pl-12">
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm z-10">4</div>
                                    <h4 className="font-display text-xl font-bold mb-4 text-foreground">Week 4: Final Deliverables & Submittal</h4>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {[
                                            "Exported plan sheets, quantity takeoffs, and cost estimates",
                                            "Provided PDF and DWG files per city submittal requirements",
                                            "White-label delivery with city engineer as designer-of-record"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-2 text-muted-foreground text-sm leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project Highlights Section */}
                <section className="bg-muted/30 py-20 mb-24">
                    <div className="section-container">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">Project Highlights</h2>
                            <p className="text-muted-foreground italic">Technical excellence and rigorous quality control across every ramp location.</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Standards Compliance Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-background rounded-2xl p-8 border border-border shadow-sm h-full"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                        <Ruler size={28} />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-foreground">Standards Compliance</h3>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">PROWAG Requirements Met:</h4>
                                        <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                                            {[
                                                { label: "Running slope", val: "≤ 1:12 (8.33%)" },
                                                { label: "Cross slope", val: "≤ 1:48 (2.08%)" },
                                                { label: "Landing dims", val: "48\" × 48\" min" },
                                                { label: "DWS depth", val: "24\" depth" },
                                                { label: "Ramp width", val: "48\" min" }
                                            ].map((item, i) => (
                                                <li key={i} className="flex flex-col border-l-2 border-secondary/20 pl-3">
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</span>
                                                    <span className="text-foreground font-semibold text-sm">{item.val}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-6 border-t border-border/50">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4 font-display">Caltrans & Local Standards:</h4>
                                        <div className="space-y-3">
                                            {[
                                                "City of Riverside CAD layer structure and naming conventions",
                                                "Caltrans Standard Plans and Details integration",
                                                "ADA/PROWAG compliance documentation for grant submittal"
                                            ].map((text, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-muted-foreground leading-snug">{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* QA/QC Process Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-background rounded-2xl p-8 border border-border shadow-sm h-full lg:translate-y-8"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                        <ClipboardCheck size={28} />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-foreground">QA/QC Process</h3>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Stage-Gate Reviews:</h4>
                                        <div className="space-y-4">
                                            {[
                                                { p: "30%", t: "Layout approval, utility coordination check" },
                                                { p: "60%", t: "Grading validation, cross-slope verification" },
                                                { p: "90%", t: "Detail callouts, quantity takeoff accuracy" }
                                            ].map((step, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="font-display font-bold text-primary w-8">{step.p}</div>
                                                    <p className="text-sm text-muted-foreground">{step.t}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/50">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Bluebeam Issue Log Tracking:</h4>
                                        <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-medium text-muted-foreground">Internal QA Issues Resolved</span>
                                                <span className="text-2xl font-bold text-primary font-display">187</span>
                                            </div>
                                            <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-primary h-full w-full"></div>
                                            </div>
                                            <p className="text-[11px] text-primary/70 font-bold mt-3 uppercase tracking-wider flex items-center gap-2">
                                                <ShieldCheck size={12} />
                                                Zero unresolved issues at final submittal
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Service Details Section */}
                <section className="section-container mb-24">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-px bg-primary"></div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Service Details</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Engagement Model */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-background p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-4 flex-shrink-0">
                                <Settings size={20} />
                            </div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Engagement Model</h4>
                            <p className="text-foreground font-bold leading-tight">White-Label Plan Production Pod</p>
                            <p className="text-[11px] text-muted-foreground mt-2 italic">(4-week dedicated capacity)</p>
                        </motion.div>

                        {/* Turnaround */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-background p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-4 flex-shrink-0">
                                <Clock size={20} />
                            </div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Turnaround</h4>
                            <p className="text-foreground font-bold">28 Days</p>
                            <p className="text-[11px] text-muted-foreground mt-2 italic">From kickoff to final deliverables</p>
                        </motion.div>

                        {/* Team Structure */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-background p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-4 flex-shrink-0">
                                <Users size={20} />
                            </div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Team Structure</h4>
                            <div className="space-y-1 mt-auto">
                                <p className="text-xs font-bold text-foreground">1 PM/QA Lead (PE oversight)</p>
                                <p className="text-xs font-bold text-foreground">3 CAD Technicians (Civil 3D)</p>
                                <p className="text-[11px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded inline-block mt-1 uppercase tracking-tighter">PE Review (final sign-off)</p>
                            </div>
                        </motion.div>

                        {/* Tools & Workflow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-background p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-4 flex-shrink-0">
                                <Wrench size={20} />
                            </div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Tools & Workflow</h4>
                            <div className="space-y-2 mt-auto">
                                <p className="text-[11px] font-medium text-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                                    Civil 3D 2022 • Bluebeam Revu
                                </p>
                                <p className="text-[11px] font-medium text-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                                    Google Drive (Controlled Access)
                                </p>
                                <p className="text-[11px] font-medium text-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                                    Zoom (Bi-weekly Progress Reviews)
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* Deliverables Section */}
                <section className="section-container mb-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-px bg-secondary"></div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Project Deliverables</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                            {[
                                "52 ramp location plans with detail sheets (4–8 sheets per ramp)",
                                "Cross-sections and grading plans for each ramp configuration",
                                "Detectable warning surface specifications and material callouts",
                                "Quantity takeoffs for concrete, DWS panels, and truncated domes",
                                "Cost estimates aligned to Caltrans unit pricing",
                                "Constructability review notes with field coordination recommendations",
                                "Bluebeam QA/QC issue logs for audit trail"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                    <p className="text-muted-foreground leading-snug">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 p-1 bg-muted rounded-2xl border border-border/50">
                            <div className="p-6 bg-background rounded-xl border border-border/50 shadow-sm">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">File Formats</span>
                                <div className="flex flex-wrap gap-2">
                                    {["PDF (Plan Check)", "DWG (Civil 3D 2022)", "XLS (Quantities)"].map((fmt, i) => (
                                        <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
                                            {fmt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 bg-background rounded-xl border border-border/50 shadow-sm flex flex-col justify-center">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Final Sheet Count</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-foreground">312</span>
                                    <span className="text-muted-foreground font-medium">Sheets Total</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 text-balance">52 ramps × 6 avg sheets/ramp</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Visuals Section */}
                <section className="bg-muted/30 py-20 mb-24">
                    <div className="section-container">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">Visuals</h2>
                            <p className="text-muted-foreground italic">Technical deliverables and data transformation lifecycle.</p>
                        </div>

                        <div className="space-y-24">
                            {/* Sample Ramp Plan Sheet */}
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="order-2 lg:order-1"
                                >
                                    <h3 className="font-display text-2xl font-bold mb-6 text-foreground">Sample Ramp Plan Sheet</h3>
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            A typical ramp layout excerpt showing the high level of detail provided in every submittal sheet. Every callout is verified against field survey data and PROWAG standards.
                                        </p>
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">Key Elements Shown:</h4>
                                            {[
                                                "Ramp layout with running slope and cross slope callouts",
                                                "Detectable warning surface placement and dimensions",
                                                "Utility coordination notes (storm drain, water line clearance)",
                                                "Landing dimensions and accessible route arrows"
                                            ].map((text, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 size={16} className="text-secondary mt-1 flex-shrink-0" />
                                                    <p className="text-sm text-muted-foreground leading-tight">{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="order-1 lg:order-2 bg-background p-4 rounded-2xl border border-border shadow-xl"
                                >
                                    <img
                                        src="/images/case-study/sample-ramp-plan.png"
                                        alt="Sample Ramp Plan Sheet"
                                        className="w-full rounded-lg"
                                    />
                                    <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em] font-bold">Typical Ramp Layout Detail</p>
                                </motion.div>
                            </div>

                            {/* Before/After Comparison */}
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-background p-4 rounded-2xl border border-border shadow-xl"
                                >
                                    <img
                                        src="/images/case-study/before-after-survey.png"
                                        alt="Before/After Survey Comparison"
                                        className="w-full rounded-lg"
                                    />
                                    <div className="flex justify-between px-4 py-3 mt-1">
                                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Raw Field Survey</span>
                                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Final CAD Plan</span>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="font-display text-2xl font-bold mb-6 text-foreground">Before/After Comparison</h3>
                                    <div className="space-y-4">
                                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-6">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Transformation:</h4>
                                            <p className="text-muted-foreground text-sm italic">
                                                Raw survey data with handwritten field notes → Professional plan sheets with full detailing and compliance callouts
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Our process bridges the gap between rough field measurements and municipal-grade engineering documents. We handle the complexity of translating field constraints into buildable, compliant designs.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results & Impact Section */}
                <section className="section-container mb-24">
                    <h2 className="font-display text-3xl font-bold mb-12 text-foreground text-center md:text-left text-balance">Results & Impact</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* On-Time Delivery Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#f0f9f4] dark:bg-green-900/10 p-8 rounded-2xl border border-green-100 dark:border-green-900/20 relative overflow-hidden"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                                    <CheckCircle2 size={24} />
                                </div>
                                <span className="text-[#2d7a4d] dark:text-green-400 font-bold text-xs uppercase tracking-widest">On-Time Delivery</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#1a4d32] dark:text-green-300 mb-4 leading-tight">
                                100% On-Schedule Completion
                            </h3>
                            <div className="w-full h-px bg-green-200 dark:bg-green-900/30 mb-6"></div>
                            <p className="text-[#2d7a4d]/80 dark:text-green-400/80 leading-relaxed font-medium">
                                Delivered all 52 ramp designs within 4-week deadline. City submitted grant application 2 days early.
                            </p>
                        </motion.div>

                        {/* Zero Corrections Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-[#f8f5ff] dark:bg-purple-900/10 p-8 rounded-2xl border border-purple-100 dark:border-purple-900/20 relative overflow-hidden"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                                    <Target size={24} />
                                </div>
                                <span className="text-[#6b4fac] dark:text-purple-400 font-bold text-xs uppercase tracking-widest">Zero Corrections</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#3d2d5c] dark:text-purple-300 mb-4 leading-tight text-balance">
                                First Submittal Approval
                            </h3>
                            <div className="w-full h-px bg-purple-200 dark:bg-purple-900/30 mb-6"></div>
                            <p className="text-[#6b4fac]/80 dark:text-purple-400/80 leading-relaxed font-medium">
                                City plan check approved all 52 ramps with zero corrections required. PROWAG compliance confirmed.
                            </p>
                        </motion.div>
                    </div>

                    {/* Key Outcomes List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-[#fff7ed] dark:bg-orange-900/10 p-8 md:p-10 rounded-2xl border border-orange-100 dark:border-orange-900/20"
                    >
                        <h4 className="font-bold text-[#9a3412] dark:text-orange-400 mb-8 text-xl">Key Outcomes:</h4>
                        <div className="grid gap-6">
                            {[
                                { label: "Grant Secured", text: "City received Caltrans ATP funding" },
                                { label: "Schedule Acceleration", text: "Project timeline advanced by 3 weeks vs. original estimate" },
                                { label: "Cost Savings", text: "Avoided hiring 2 full-time CAD staff" },
                                { label: "Quality Metrics", text: "0% rework rate, 100% QA pass rate at final review" },
                                { label: "Client Satisfaction", text: "5.0/5.0 rating, requested PavePath for Phase 2 work" }
                            ].map((outcome, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center mt-1 flex-shrink-0 shadow-sm shadow-green-200 dark:shadow-none">
                                        <CheckCircle2 size={16} className="text-white" />
                                    </div>
                                    <p className="text-[#9a3412]/90 dark:text-orange-300/80 text-lg">
                                        <strong className="text-[#9a3412] dark:text-orange-400 font-bold">{outcome.label}:</strong> {outcome.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Client Testimonial section */}
                <section className="section-container mb-24">
                    <h2 className="font-display text-2xl font-bold mb-8 text-foreground">Client Testimonial</h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-muted/30 p-8 md:p-12 rounded-2xl border border-border/50 relative"
                    >
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-6">
                                <div className="w-1 bg-foreground/20 rounded-full flex-shrink-0"></div>
                                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                                    "PavePath delivered flawless work under an impossible deadline. Their team understood our CAD standards, PROWAG requirements, and constructability concerns from day one. The ramp designs passed plan check without a single correction, which has never happened on a project this size. They're now our go-to partner for ADA compliance work."
                                </p>
                            </div>

                            <div className="space-y-4 pl-7">
                                <div className="flex gap-3">
                                    <div className="w-0.5 bg-foreground/20 h-5 mt-1 flex-shrink-0"></div>
                                    <p className="text-foreground/80 font-bold uppercase tracking-widest text-sm">Senior Civil Engineer, City of Riverside Public Works</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-0.5 bg-foreground/20 h-5 mt-1 flex-shrink-0"></div>
                                    <p className="text-foreground/80 font-bold uppercase tracking-widest text-sm">ADA Transition Plan Project Manager</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Execution Toolkit Lead Magnet Section */}
                <section className="bg-primary/5 py-24 mb-24 border-y border-primary/10">
                    <div className="section-container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="md:w-1/2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                                        <Package size={14} />
                                        Exclusive Resource
                                    </div>
                                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                                        See How We Execute Complex Projects — <span className="text-secondary">Zero Risk</span>
                                    </h2>
                                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                        Want to see the execution framework behind this case study? Request access to our project delivery toolkit that shows how we deliver zero-correction work on tight deadlines.
                                    </p>

                                    <div className="bg-background/50 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 shadow-inner mb-8">
                                        <h3 className="font-display font-bold text-lg mb-2 flex items-center gap-2 text-foreground">
                                            🚀 Request Your Resource Access
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            Get immediate access to all 6 resources. Complete the form below and we'll send your download link within 3 (business day).
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-[6px] hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-secondary/10"
                                        >
                                            Yes, Request Access Form
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                <div className="md:w-1/2">
                                    <div className="bg-background rounded-3xl p-8 border border-border shadow-2xl relative">
                                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/10 rounded-full blur-2xl"></div>
                                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>

                                        <h4 className="font-display text-xl font-bold mb-8 text-foreground flex items-center gap-3 relative z-10">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <Layers size={18} />
                                            </div>
                                            Behind-the-Scenes Resource Pack
                                        </h4>

                                        <div className="grid gap-4 relative z-10">
                                            {[
                                                { icon: <Calendar size={16} />, label: "4-Week Project Execution Timeline", desc: "Week-by-week breakdown for 52 ramps" },
                                                { icon: <ShieldCheck size={16} />, label: "Stage-Gate QA/QC Framework", desc: "Our 30/60/90 checkpoint system" },
                                                { icon: <Settings size={16} />, label: "White-Label Delivery Model Overview", desc: "Invisibly integrate with your team" },
                                                { icon: <Search size={16} />, label: "Bluebeam Issue Log Sample", desc: "Real project QA tracking data" },
                                                { icon: <ClipboardList size={16} />, label: "Client Kickoff Checklist", desc: "Week 1 standards alignment framework" },
                                                { icon: <Calculator size={16} />, label: "Capacity Planning Calculator", desc: "In-House hiring vs. Pod Model" }
                                            ].map((item, i) => (
                                                <div key={i} className="group p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                                                    <div className="flex gap-4">
                                                        <div className="mt-1 text-secondary group-hover:scale-110 transition-transform">
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-sm font-bold text-foreground mb-0.5">{item.label}</h5>
                                                            <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-container text-center pt-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
                        Have a similar project bottleneck?
                    </h2>
                    <button
                        onClick={scrollToContact}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-[6px] hover:bg-secondary/90 transition-all flex items-center gap-2 mx-auto text-lg group"
                    >
                        Start Your Free Pilot Task Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </section>
            </main>
            <Footer />

            {/* Lead Magnet Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 md:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-6 top-6 text-muted-foreground hover:text-foreground transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
                                {!formSubmitted ? (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 pr-8">
                                                Get Your Execution Framework Resources
                                            </h2>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Complete this form to receive immediate access to our 6-resource toolkit showing how we deliver zero-correction work on tight deadlines.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-foreground flex items-center gap-1">
                                                        Full Name<span className="text-secondary">*</span>
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Your answer"
                                                        className="w-full bg-muted/30 border border-border focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none text-sm"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-foreground">
                                                        Job Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Your answer"
                                                        className="w-full bg-muted/30 border border-border focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none text-sm"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-foreground">
                                                        Company/Agency
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Your answer"
                                                        className="w-full bg-muted/30 border border-border focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none text-sm"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-foreground flex items-center gap-1">
                                                        Email Address<span className="text-secondary">*</span>
                                                    </label>
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder="Your answer"
                                                        className="w-full bg-muted/30 border border-border focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none text-sm"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-foreground">
                                                        Phone (optional)
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        placeholder="Your answer"
                                                        className="w-full bg-muted/30 border border-border focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none text-sm"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-foreground">
                                                        Current Challenge
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        placeholder="Your answer"
                                                        className="w-full bg-muted/30 border border-border focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none text-sm resize-none"
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-sm font-bold text-foreground">
                                                        Interest Type
                                                    </label>
                                                    <div className="space-y-3">
                                                        {[
                                                            "Resource Pack Only",
                                                            "Resource Pack + Demo",
                                                            "Just Want to Talk"
                                                        ].map((option, i) => (
                                                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                                <div className="relative flex items-center justify-center">
                                                                    <input
                                                                        type="radio"
                                                                        name="interest"
                                                                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-border checked:border-secondary transition-all"
                                                                        defaultChecked={i === 0}
                                                                    />
                                                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-secondary opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                                </div>
                                                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full py-4 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 mt-4"
                                            >
                                                Submit form
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="py-20 text-center space-y-4">
                                        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-foreground">Request Received!</h3>
                                        <p className="text-muted-foreground max-w-xs mx-auto">
                                            We've received your request. Your personalized Resource Pack will be sent to your email within 3 business days.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UseCase;
