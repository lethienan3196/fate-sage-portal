
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import PillarCard from '@/components/PillarCard';
import SectionHeading from '@/components/SectionHeading';
import ElementChart from '@/components/ElementChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, GraduationCap, Coins, Heart, ChevronDown, Clock, User, MapPin, ChevronRight, Briefcase, DollarSign, Users, Sparkles } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Update scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update scroll indicator width
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / height) * 100;
      const indicator = document.querySelector('.scroll-indicator') as HTMLElement;
      if (indicator) {
        indicator.style.width = `${scrolled}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set up intersection observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setAnimatedElements((prev) => new Set([...prev, entry.target.id]));
            
            // Also animate all children with animation classes
            const elements = entry.target.querySelectorAll('.element-fade-in');
            elements.forEach((el, index) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add('element-visible');
              }, 100 * index);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    
    // Observe all elements with animation classes
    document.querySelectorAll('.section-transition').forEach(section => {
      if (section) {
        observerRef.current?.observe(section);
      }
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Scroll indicator */}
      <div className="scroll-indicator"></div>
      
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300",
          scrollY > 50 
            ? "bg-white/80 backdrop-blur-md shadow-sm py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container max-w-6xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">BaZi Analysis</h1>
        </div>
      </header>

      {/* Hero section */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="container max-w-5xl relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Your BaZi Destiny
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              A premium analysis of your life path based on ancient Chinese wisdom
            </p>
          </div>
          
          {/* Eight Characters (BaZi) */}
          <div className="mb-12 text-center">
            <div className="water-chip mb-4">八字 BaZi</div>
            <div className="text-3xl md:text-4xl font-semibold tracking-wide mb-2">
              丙子 辛卯 丁卯 丁未
            </div>
            <p className="text-gray-500">Born on March 31, 1996 at 14:00</p>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-48 h-48 bg-amber-200/20 rounded-full blur-3xl"></div>
      </section>

      {/* Tabs Section */}
      <section className="py-10 md:py-16">
        <div className="container max-w-6xl">
          <Tabs 
            defaultValue="basic" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="overflow-x-auto pb-2 mb-8">
              <TabsList className={cn(
                "w-full max-w-3xl mx-auto grid",
                isMobile ? "grid-cols-2 gap-2" : "grid-cols-5"
              )}>
                <TabsTrigger value="basic" className="flex items-center gap-2 h-auto py-2">
                  <User className="h-4 w-4 flex-shrink-0" />
                  <span className={cn(isMobile ? "text-xs" : "text-sm")}>Basic Info</span>
                </TabsTrigger>
                <TabsTrigger value="career" className="flex items-center gap-2 h-auto py-2">
                  <Briefcase className="h-4 w-4 flex-shrink-0" />
                  <span className={cn(isMobile ? "text-xs" : "text-sm")}>Career</span>
                </TabsTrigger>
                <TabsTrigger value="wealth" className="flex items-center gap-2 h-auto py-2">
                  <Coins className="h-4 w-4 flex-shrink-0" />
                  <span className={cn(isMobile ? "text-xs" : "text-sm")}>Wealth</span>
                </TabsTrigger>
                <TabsTrigger value="marriage" className="flex items-center gap-2 h-auto py-2">
                  <Heart className="h-4 w-4 flex-shrink-0" />
                  <span className={cn(isMobile ? "text-xs" : "text-sm")}>Marriage</span>
                </TabsTrigger>
                <TabsTrigger value="2025" className="flex items-center gap-2 h-auto py-2">
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <span className={cn(isMobile ? "text-xs" : "text-sm")}>2025 Forecast</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Basic Information Tab */}
            <TabsContent value="basic" className="section-transition">
              <SectionHeading 
                title="Basic Information" 
                subtitle="Your core BaZi chart and personal elements"
                icon={<User className="w-8 h-8 text-blue-500" />}
                className="element-fade-in"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Left column: BaZi Pillars */}
                <div className="element-fade-in">
                  <h3 className="text-lg font-semibold mb-4 text-center">Your Four Pillars (四柱)</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <PillarCard 
                      title="Year" 
                      heavenlyStem={{
                        character: "丙",
                        element: "Fire",
                        tenGod: "Rob Wealth"
                      }}
                      earthlyBranch={{
                        character: "子",
                        hiddenStems: [
                          {
                            character: "癸",
                            element: "Water",
                            tenGod: "7 Killing"
                          }
                        ]
                      }}
                    />
                    <PillarCard 
                      title="Month" 
                      heavenlyStem={{
                        character: "辛",
                        element: "Metal",
                        tenGod: "Indirect Wealth"
                      }}
                      earthlyBranch={{
                        character: "卯",
                        hiddenStems: [
                          {
                            character: "乙",
                            element: "Wood",
                            tenGod: "Indirect Resource"
                          }
                        ]
                      }}
                    />
                    <PillarCard 
                      title="Day" 
                      heavenlyStem={{
                        character: "丁",
                        element: "Fire",
                        tenGod: "Self"
                      }}
                      earthlyBranch={{
                        character: "卯",
                        hiddenStems: [
                          {
                            character: "乙",
                            element: "Wood",
                            tenGod: "Indirect Resource"
                          }
                        ]
                      }}
                    />
                    <PillarCard 
                      title="Hour" 
                      heavenlyStem={{
                        character: "丁",
                        element: "Fire",
                        tenGod: "Friend"
                      }}
                      earthlyBranch={{
                        character: "未",
                        hiddenStems: [
                          {
                            character: "己",
                            element: "Earth",
                            tenGod: "Direct Officer"
                          },
                          {
                            character: "丁",
                            element: "Fire",
                            tenGod: "Friend"
                          },
                          {
                            character: "乙",
                            element: "Wood",
                            tenGod: "Indirect Resource"
                          }
                        ]
                      }}
                    />
                  </div>
                  
                  <div className="mt-8">
                    <div className="glass-card p-6">
                      <h4 className="text-md font-semibold mb-3">Chart Structure</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        The structure of your BaZi chart reveals the balance and interaction of elements.
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        <li>Combination of Wood and Fire</li>
                        <li>Weak Metal element</li>
                        <li>Strong presence of Water</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Right column: Personal Info & Element Analysis */}
                <div>
                  <div className="glass-card p-6 element-fade-in">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Date of Birth:</strong> March 31, 1996
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Time of Birth:</strong> 14:00 (2 PM)
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong>Gender:</strong> Male
                    </p>
                    
                    <h4 className="text-md font-semibold mb-3">Element Analysis</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      An analysis of the five elements in your chart:
                    </p>
                    
                    <ElementChart 
                      elements={{
                        Water: 30,
                        Wood: 25,
                        Fire: 20,
                        Earth: 15,
                        Metal: 10,
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Career Tab */}
            <TabsContent value="career" className="section-transition">
              <SectionHeading 
                title="Career Insights" 
                subtitle="Your professional path based on BaZi analysis"
                icon={<Briefcase className="w-8 h-8 text-blue-500" />}
                className="element-fade-in"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left column: Career Overview */}
                <div className="lg:col-span-7 element-fade-in">
                  <h3 className="text-lg font-semibold mb-4">Career Path Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    Based on your BaZi, you have a strong inclination towards careers that involve creativity, communication, and leadership.
                  </p>
                  
                  <ul className="list-disc pl-5 text-gray-600">
                    <li><strong>Suitable Industries:</strong> Media, Arts, Education, Consulting</li>
                    <li><strong>Potential Roles:</strong> Creative Director, Educator, Consultant, Public Speaker</li>
                    <li><strong>Key Strengths:</strong> Communication, Creativity, Leadership</li>
                  </ul>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-3">Challenges and Opportunities</h4>
                    <p className="text-sm text-gray-600">
                      While your chart indicates strong potential, be mindful of challenges related to decision-making and maintaining focus.
                    </p>
                  </div>
                </div>
                
                {/* Right column: Timeline & Career Development */}
                <div className="lg:col-span-5">
                  <h3 className="text-lg font-semibold mb-4">Career Timeline & Development</h3>
                  
                  <div className="glass-card p-4">
                    <div className="flex items-center mb-3">
                      <Clock className="w-5 h-5 mr-2 text-blue-400" />
                      <span className="text-sm font-semibold">Early Career (2018-2025)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Focus on building a strong foundation and gaining diverse experiences.
                    </p>
                    
                    <div className="flex items-center mb-3">
                      <Clock className="w-5 h-5 mr-2 text-blue-400" />
                      <span className="text-sm font-semibold">Mid-Career (2026-2035)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Opportunities for advancement and leadership roles will emerge.
                    </p>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-400" />
                      <span className="text-sm font-semibold">Late Career (2036 onwards)</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Potential for significant achievements and recognition in your field.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Wealth Tab */}
            <TabsContent value="wealth" className="section-transition">
              <SectionHeading 
                title="Wealth Analysis" 
                subtitle="Your financial destiny and potential based on BaZi"
                icon={<Coins className="w-8 h-8 text-blue-500" />}
                className="element-fade-in"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left column: Wealth Overview */}
                <div className="lg:col-span-7 element-fade-in">
                  <h3 className="text-lg font-semibold mb-4">Wealth Overview</h3>
                  <p className="text-gray-600 mb-4">
                    Your BaZi chart suggests a balanced approach to wealth accumulation.
                  </p>
                  
                  <ul className="list-disc pl-5 text-gray-600">
                    <li><strong>Primary Wealth Element:</strong> Wood</li>
                    <li><strong>Favorable Wealth Directions:</strong> East, Southeast</li>
                    <li><strong>Potential Wealth Sources:</strong> Investments, Real Estate, Creative Ventures</li>
                  </ul>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-3">Financial Strategies</h4>
                    <p className="text-sm text-gray-600">
                      Focus on long-term investments and diversify your income streams.
                    </p>
                  </div>
                </div>
                
                {/* Right column: Financial Timeline */}
                <div className="lg:col-span-5">
                  <h3 className="text-lg font-semibold mb-4">Financial Timeline</h3>
                  
                  <div className="glass-card p-4">
                    <div className="flex items-center mb-3">
                      <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                      <span className="text-sm font-semibold">Early Wealth (2018-2025)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Building a solid financial foundation through consistent savings and smart investments.
                    </p>
                    
                    <div className="flex items-center mb-3">
                      <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                      <span className="text-sm font-semibold">Mid-Wealth (2026-2035)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Opportunities for significant financial growth and strategic investments.
                    </p>
                    
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                      <span className="text-sm font-semibold">Late Wealth (2036 onwards)</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Potential for long-term financial security and legacy building.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Marriage Tab */}
            <TabsContent value="marriage" className="section-transition">
              <SectionHeading 
                title="Relationship & Marriage" 
                subtitle="Your romantic destiny and partnership potential"
                icon={<Heart className="w-8 h-8 text-blue-500" />}
                className="element-fade-in"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left column: Relationship Overview */}
                <div className="lg:col-span-7 element-fade-in">
                  <h3 className="text-lg font-semibold mb-4">Relationship Overview</h3>
                  <p className="text-gray-600 mb-4">
                    Your BaZi chart indicates a harmonious approach to relationships.
                  </p>
                  
                  <ul className="list-disc pl-5 text-gray-600">
                    <li><strong>Favorable Partner Elements:</strong> Wood, Fire</li>
                    <li><strong>Relationship Strengths:</strong> Communication, Empathy, Support</li>
                    <li><strong>Potential Challenges:</strong> Balancing Independence and Togetherness</li>
                  </ul>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-3">Relationship Strategies</h4>
                    <p className="text-sm text-gray-600">
                      Focus on open communication and mutual respect in your relationships.
                    </p>
                  </div>
                </div>
                
                {/* Right column: Relationship Timeline */}
                <div className="lg:col-span-5">
                  <h3 className="text-lg font-semibold mb-4">Relationship Timeline</h3>
                  
                  <div className="glass-card p-4">
                    <div className="flex items-center mb-3">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      <span className="text-sm font-semibold">Early Relationships (2018-2025)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Exploring different relationship dynamics and understanding your needs.
                    </p>
                    
                    <div className="flex items-center mb-3">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      <span className="text-sm font-semibold">Mid-Relationships (2026-2035)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Potential for a committed partnership and long-term relationship.
                    </p>
                    
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      <span className="text-sm font-semibold">Late Relationships (2036 onwards)</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Building a lasting and fulfilling partnership based on mutual growth and support.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 2025 Forecast Tab */}
            <TabsContent value="2025" className="section-transition">
              <SectionHeading 
                title="2025 Forecast" 
                subtitle="Your BaZi predictions for the coming year"
                icon={<Sparkles className="w-8 h-8 text-blue-500" />}
                className="element-fade-in"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left column: General Forecast */}
                <div className="lg:col-span-7 element-fade-in">
                  <h3 className="text-lg font-semibold mb-4">General Forecast</h3>
                  <p className="text-gray-600 mb-4">
                    The year 2025 brings opportunities for growth and expansion in various aspects of your life.
                  </p>
                  
                  <ul className="list-disc pl-5 text-gray-600">
                    <li><strong>Key Themes:</strong> Growth, Expansion, Opportunity</li>
                    <li><strong>Favorable Months:</strong> March, June, September</li>
                    <li><strong>Potential Challenges:</strong> Overcommitment, Stress</li>
                  </ul>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-3">Recommendations</h4>
                    <p className="text-sm text-gray-600">
                      Focus on prioritizing your goals and managing your time effectively.
                    </p>
                  </div>
                </div>
                
                {/* Right column: Detailed Forecast */}
                <div className="lg:col-span-5">
                  <h3 className="text-lg font-semibold mb-4">Detailed Forecast</h3>
                  
                  <div className="glass-card p-4">
                    <div className="flex items-center mb-3">
                      <GraduationCap className="w-5 h-5 mr-2 text-yellow-500" />
                      <span className="text-sm font-semibold">Career</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Opportunities for career advancement and new projects.
                    </p>
                    
                    <div className="flex items-center mb-3">
                      <Coins className="w-5 h-5 mr-2 text-green-500" />
                      <span className="text-sm font-semibold">Wealth</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Potential for financial gains through investments and business ventures.
                    </p>
                    
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      <span className="text-sm font-semibold">Relationships</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Harmonious relationships and opportunities for new connections.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;
