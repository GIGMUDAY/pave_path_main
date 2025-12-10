import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Phone, ArrowRight, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { saveCallRequest, saveRedlineRequest } from '@/lib/contactService';
import { trackEvent } from '@/hooks/useAnalytics';

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'call' | 'redline'>('call');
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [callForm, setCallForm] = useState({ 
    name: '', 
    firm: '', 
    role: '', 
    email: '', 
    phone: '', 
    draftingSupport: [] as string[], 
    otherService: '',
    message: '' 
  });
  const [redlineForm, setRedlineForm] = useState({ name: '', email: '', deadline: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const draftingSupportOptions = [
    'Redlines',
    'ADA curb ramps',
    'Traffic control plans',
    'SWPPP / erosion control',
    'Plan set cleanup',
    'Other'
  ];

  const handleDraftingSupportChange = (option: string, checked: boolean) => {
    if (checked) {
      setCallForm({ ...callForm, draftingSupport: [...callForm.draftingSupport, option] });
    } else {
      setCallForm({ 
        ...callForm, 
        draftingSupport: callForm.draftingSupport.filter(item => item !== option),
        ...(option === 'Other' ? { otherService: '' } : {})
      });
    }
    // Close the popover after selection
    setPopoverOpen(false);
  };

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveCallRequest(callForm);
      // Track form submission in Analytics
      trackEvent('form_submission', {
        form_type: 'call_request',
        drafting_support_count: callForm.draftingSupport.length,
      });
      toast({
        title: "Request Submitted!",
        description: "We'll be in touch within 24 hours to schedule your call.",
        variant: "success",
      });
      setCallForm({ name: '', firm: '', role: '', email: '', phone: '', draftingSupport: [], otherService: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveRedlineRequest(redlineForm);
      // Track form submission in Analytics
      trackEvent('form_submission', {
        form_type: 'redline_request',
      });
      toast({
        title: "Redline Task Received!",
        description: "Our team will review and send you a quote within 2 hours.",
        variant: "success",
      });
      setRedlineForm({ name: '', email: '', deadline: '', description: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full" ref={ref}>
      {/* Green Background Section with White Lines */}
      <div className="relative bg-secondary dark:bg-background">
        {/* Top white line */}
        <div className="h-px bg-white/20"></div>
        
        <div className="section-container relative z-10 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-secondary-foreground dark:text-secondary font-medium text-sm uppercase tracking-wider">Get Started</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 text-secondary-foreground dark:text-foreground">
              Let's Talk About Your Drafting Needs
            </h2>
            <p className="text-secondary-foreground/90 dark:text-foreground/90 text-base sm:text-lg max-w-2xl mx-auto">
              Whether you're dealing with a temporary spike in work or looking for a reliable long-term drafting 
              partner, we'd love to learn more about your workload and standards.
            </p>
          </motion.div>
        </div>
        
        {/* Bottom white line */}
        <div className="h-px bg-white/20"></div>
      </div>

      {/* White Background Section for Forms */}
      <div className="bg-white dark:bg-background section-spacing">
        <div className="section-container relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
          {/* Tab buttons */}
              <div className="flex rounded-xl bg-muted/50 dark:bg-card/50 border border-border/50 dark:border-border/50 p-1 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab('call')}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-all touch-manipulation min-h-[44px] text-sm sm:text-base ${
                    activeTab === 'call' 
                      ? 'bg-white dark:bg-card text-primary dark:text-foreground shadow-lg border border-border/50 dark:border-border/50' 
                      : 'text-foreground/70 dark:text-foreground/70 hover:text-foreground dark:hover:text-foreground'
                  }`}
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:inline">Book a Call</span>
              <span className="xs:hidden">Call</span>
            </button>
            <button
              onClick={() => setActiveTab('redline')}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-all touch-manipulation min-h-[44px] text-sm sm:text-base ${
                    activeTab === 'redline' 
                      ? 'bg-white dark:bg-card text-primary dark:text-foreground shadow-lg border border-border/50 dark:border-border/50' 
                      : 'text-foreground/70 dark:text-foreground/70 hover:text-foreground dark:hover:text-foreground'
                  }`}
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:inline">Submit Redline Task</span>
              <span className="xs:hidden">Redline</span>
            </button>
          </div>

          {/* Forms */}
          <div className="bg-white dark:bg-card border border-border/50 dark:border-border/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg">
            {activeTab === 'call' ? (
              <form onSubmit={handleCallSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={callForm.name}
                    onChange={(e) => setCallForm({ ...callForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Firm / Organization</label>
                  <input
                    type="text"
                    value={callForm.firm}
                    onChange={(e) => setCallForm({ ...callForm, firm: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                    placeholder="ABC Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    value={callForm.role}
                    onChange={(e) => setCallForm({ ...callForm, role: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                    placeholder="Project Manager"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={callForm.email}
                      onChange={(e) => setCallForm({ ...callForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <input
                      type="tel"
                      value={callForm.phone}
                      onChange={(e) => setCallForm({ ...callForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">What type of drafting support do you need? <span className="text-muted-foreground font-normal">(multi-select)</span></label>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left touch-manipulation min-h-[44px] text-base"
                      >
                        <span className={callForm.draftingSupport.length > 0 ? 'text-foreground' : 'text-muted-foreground'}>
                          {callForm.draftingSupport.length > 0 
                            ? `${callForm.draftingSupport.length} selected` 
                            : 'Select drafting support options...'}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-[var(--radix-popover-trigger-width)] p-0" 
                      align="start"
                    >
                      <div className="p-2">
                        <div className="space-y-2">
                          {draftingSupportOptions.map((option) => (
                            <div 
                              key={option} 
                              className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                              onClick={(e) => {
                                // Prevent the click from closing the popover immediately
                                e.stopPropagation();
                              }}
                            >
                              <Checkbox
                                id={option}
                                checked={callForm.draftingSupport.includes(option)}
                                onCheckedChange={(checked) => handleDraftingSupportChange(option, checked as boolean)}
                              />
                              <label
                                htmlFor={option}
                                className="text-sm font-medium leading-none cursor-pointer flex-1"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {callForm.draftingSupport.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {callForm.draftingSupport.map((option) => (
                        <span
                          key={option}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {option}
                          <button
                            type="button"
                            onClick={() => handleDraftingSupportChange(option, false)}
                            className="hover:text-primary/80"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {callForm.draftingSupport.includes('Other') && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Please specify the service you need:</label>
                      <input
                        type="text"
                        value={callForm.otherService}
                        onChange={(e) => setCallForm({ ...callForm, otherService: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                        placeholder="Enter the service you need..."
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={callForm.message}
                    onChange={(e) => setCallForm({ ...callForm, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-base touch-manipulation min-h-[120px]"
                    placeholder="Tell us about your project needs..."
                  />
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Want to try us first? Ask for a free pilot redline update in your message.
                </p>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full group bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 px-6 py-3.5 sm:py-3 rounded-[6px] font-semibold transition-all touch-manipulation min-h-[48px] text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Submitting...' : 'Schedule Call'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />}
                  </span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRedlineSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={redlineForm.name}
                      onChange={(e) => setRedlineForm({ ...redlineForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={redlineForm.email}
                      onChange={(e) => setRedlineForm({ ...redlineForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Deadline</label>
                  <input
                    type="text"
                    value={redlineForm.deadline}
                    onChange={(e) => setRedlineForm({ ...redlineForm, deadline: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base touch-manipulation min-h-[44px]"
                    placeholder="e.g., Monday 9am EST"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Task Description</label>
                  <textarea
                    value={redlineForm.description}
                    onChange={(e) => setRedlineForm({ ...redlineForm, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-base touch-manipulation min-h-[120px]"
                    placeholder="Describe the redlines and attach files after submission..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full group bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 px-6 py-3.5 sm:py-3 rounded-[6px] font-semibold transition-all touch-manipulation min-h-[48px] text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Submitting...' : 'Submit for Quote'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />}
                  </span>
                </button>
              </form>
            )}
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
