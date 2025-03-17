import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import PillarCard from '@/components/PillarCard';
import SectionHeading from '@/components/SectionHeading';
import ElementChart from '@/components/ElementChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, GraduationCap, Coins, Heart, ChevronDown, Clock, User, MapPin, ChevronRight, Briefcase, DollarSign, Users, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  
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
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto mb-10">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Basic Info</span>
              </TabsTrigger>
              <TabsTrigger value="career" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Career</span>
              </TabsTrigger>
              <TabsTrigger value="wealth" className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                <span>Wealth</span>
              </TabsTrigger>
              <TabsTrigger value="marriage" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Marriage</span>
              </TabsTrigger>
              <TabsTrigger value="2025" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>2025 Forecast</span>
              </TabsTrigger>
            </TabsList>
            
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
                        tenGod: "Rob Wealth",
                      }}
                      earthlyBranch={{
                        character: "子",
                        hiddenStems: [
                          {
                            character: "癸",
                            element: "Water",
                            tenGod: "7 Killing",
                          }
                        ]
                      }}
                      className="element-fade-in"
                    />
                    
                    <PillarCard 
                      title="Month" 
                      heavenlyStem={{
                        character: "辛",
                        element: "Metal",
                        tenGod: "Indirect Wealth",
                      }}
                      earthlyBranch={{
                        character: "卯",
                        hiddenStems: [
                          {
                            character: "乙",
                            element: "Wood",
                            tenGod: "Indirect Resource",
                          }
                        ]
                      }}
                      className="element-fade-in"
                    />
                    
                    <PillarCard 
                      title="Day" 
                      heavenlyStem={{
                        character: "丁",
                        element: "Fire",
                        tenGod: "Self",
                      }}
                      earthlyBranch={{
                        character: "卯",
                        hiddenStems: [
                          {
                            character: "乙",
                            element: "Wood",
                            tenGod: "Indirect Resource",
                          }
                        ]
                      }}
                      className="element-fade-in"
                    />
                    
                    <PillarCard 
                      title="Hour" 
                      heavenlyStem={{
                        character: "丁",
                        element: "Fire",
                        tenGod: "Friend",
                      }}
                      earthlyBranch={{
                        character: "未",
                        hiddenStems: [
                          {
                            character: "己",
                            element: "Earth",
                            tenGod: "Direct Officer",
                          },
                          {
                            character: "丁",
                            element: "Fire",
                            tenGod: "Friend",
                          },
                          {
                            character: "乙",
                            element: "Wood",
                            tenGod: "Indirect Resource",
                          }
                        ]
                      }}
                      className="element-fade-in"
                    />
                  </div>
                  
                  <div className="mt-8">
                    <div className="glass-card p-6">
                      <h4 className="font-medium mb-3">Chart Structure</h4>
                      <p className="text-gray-600 mb-2">
                        Day Master: <span className="font-medium text-red-600">丁 (Ding) Fire</span>
                      </p>
                      <p className="text-gray-600 mb-2">
                        BaZi Structure: <span className="font-medium">Indirect Resource (偏印) Structure</span>
                      </p>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          <li>Fire day master with significant Wood influence</li>
                          <li>Water element appears in hidden stem</li>
                          <li>Multiple Indirect Resource elements supporting the Fire day master</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right column: Personal Info & Element Analysis */}
                <div>
                  <div className="glass-card p-6 mb-6 element-fade-in">
                    <h3 className="font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Gender</p>
                          <p className="font-medium">Male</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">March 31, 1996</p>
                          <p className="text-sm text-gray-500">11 days after Vernal Equinox</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Time of Birth</p>
                          <p className="font-medium">14:00 (2:00 PM)</p>
                          <p className="text-sm text-gray-500">Goat/Sheep Hour (未)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Chinese Zodiac</p>
                          <p className="font-medium">Rat (子)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 element-fade-in">
                    <h3 className="font-semibold mb-4">Element Analysis</h3>
                    <div className="flex flex-col items-center">
                      <div className="w-full h-64 mb-4">
                        <ElementChart 
                          elements={{
                            Fire: 3,
                            Earth: 1,
                            Metal: 1,
                            Water: 1,
                            Wood: 2,
                          }}
                        />
                      </div>
                      
                      <div className="w-full mt-2">
                        <h4 className="text-sm font-medium mb-3">Element Balance</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-red-600 font-medium">Fire (Day Master)</span>
                              <span>Strong</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-green-600 font-medium">Wood (Resource)</span>
                              <span>Moderate</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-medium">Metal (Wealth)</span>
                              <span>Weak</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-blue-600 font-medium">Water (Intelligence)</span>
                              <span>Weak</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-amber-600 font-medium">Earth (Power)</span>
                              <span>Weak</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left column: Career Overview */}
                <div className="md:col-span-7 element-fade-in">
                  <div className="glass-card p-8 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
                    <div className="absolute bottom-10 -left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
                    
                    <h3 className="text-xl font-semibold mb-4 relative z-10">Career Path Analysis</h3>
                    
                    <div className="space-y-6 relative z-10">
                      <div>
                        <h4 className="text-lg font-medium mb-2">Suitable Career Fields</h4>
                        <p className="text-gray-600 mb-3">
                          With a Fire day master supported by Wood resources, you are naturally drawn to careers that involve:
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 border shadow-sm">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                              <span className="font-medium">Creative Industries</span>
                            </div>
                            <p className="text-sm text-gray-600">Design, marketing, content creation</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border shadow-sm">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                              <span className="font-medium">Technology</span>
                            </div>
                            <p className="text-sm text-gray-600">Software development, product design</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border shadow-sm">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                              <span className="font-medium">Education</span>
                            </div>
                            <p className="text-sm text-gray-600">Teaching, coaching, mentoring</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border shadow-sm">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                              <span className="font-medium">Personal Development</span>
                            </div>
                            <p className="text-sm text-gray-600">Counseling, therapy, consulting</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-2">Career Strengths</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span>Strong creative and innovative thinking abilities</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span>Natural leadership qualities when passionate about a subject</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span>Good at inspiring and motivating others around you</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span>Ability to learn quickly and adapt to new situations</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-2">Career Challenges</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                            <span>May struggle with consistent long-term focus</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                            <span>Need to balance enthusiasm with practical execution</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                            <span>Can be sensitive to criticism in professional settings</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right column: Timeline & Career Development */}
                <div className="md:col-span-5">
                  <div className="glass-card p-6 mb-6 element-fade-in">
                    <h3 className="font-semibold mb-4">Career Timeline</h3>
                    
                    <div className="relative border-l-2 border-blue-200 pl-6 py-2 ml-2">
                      <div className="mb-6 relative">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                        <div className="earth-chip mb-2">Early Career (2017-2026)</div>
                        <h4 className="font-medium mb-1">Exploration Phase</h4>
                        <p className="text-sm text-gray-600">
                          During this period influenced by the Wood element (甲午), you'll likely experience a time of learning and growth. This is an excellent time for education, skill development, and trying different career paths.
                        </p>
                      </div>
                      
                      <div className="mb-6 relative">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-green-500"></div>
                        <div className="wood-chip mb-2">Mid-Career (2027-2036)</div>
                        <h4 className="font-medium mb-1">Stability & Growth</h4>
                        <p className="text-sm text-gray-600">
                          As you enter the 乙未 period, the Wood and Earth influences suggest a time of stability and potential advancement. Focus on developing expertise and building professional relationships.
                        </p>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-red-500"></div>
                        <div className="fire-chip mb-2">Established Career (2037-2046)</div>
                        <h4 className="font-medium mb-1">Leadership & Achievement</h4>
                        <p className="text-sm text-gray-600">
                          The 丙申 period brings Fire and Metal energies, potentially leading to leadership roles and significant professional achievements. Your natural creativity will be highlighted during this time.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 element-fade-in">
                    <h3 className="font-semibold mb-4">Career Development Guidance</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <GraduationCap className="w-5 h-5 text-blue-500 mr-2" />
                          <h4 className="font-medium">Educational Focus</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Focus on fields that combine creativity with practical skills. Technical knowledge supported by creative application will bring the best results for your chart.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
                          <h4 className="font-medium">Work Environment</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          You'll thrive in dynamic environments that value innovation and allow for some independence. Avoid overly rigid or highly competitive settings that may suppress your natural creativity.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <User className="w-5 h-5 text-blue-500 mr-2" />
                          <h4 className="font-medium">Working With Others</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Your chart shows potential for good teamwork and collaboration, especially when you can take on roles that involve inspiring or teaching others. Develop your communication skills to maximize this potential.
                        </p>
                      </div>
                    </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Overview */}
                <div className="md:col-span-6 element-fade-in">
                  <div className="glass-card p-8 h-full">
                    <h3 className="text-xl font-semibold mb-4">Wealth Overview</h3>
                    <p className="text-gray-600 mb-6">
                      In your BaZi chart, wealth is represented by the Metal element. With 辛 (Metal) appearing in your month pillar as Indirect Wealth (偏财), your financial picture shows:
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium mb-3">Wealth Stars in Your Chart</h4>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Primary Wealth Star:</span> 辛 Metal (Indirect Wealth) in Month Pillar
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Wealth Element Strength:</span> Moderately Weak
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-3">Financial Character</h4>
                        <ul className="space-y-2.5 text-gray-600">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>You tend to approach money with creativity and innovation rather than pure pursuit of wealth</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>More likely to value financial independence over accumulating vast wealth</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>May experience fluctuations in income, particularly during Fire-strong periods</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>Natural ability to attract resources through relationships and networking</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-lg font-medium mb-3">Wealth Patterns</h4>
                        <div className="bg-white p-4 rounded-lg border">
                          <p className="text-gray-600 mb-4">Your chart suggests a wealth pattern that is:</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Steady</span>
                            <div className="w-64 h-2 bg-gray-200 rounded-full">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <span className="text-sm">Fluctuating</span>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm">Effort-based</span>
                            <div className="w-64 h-2 bg-gray-200 rounded-full">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="text-sm">Luck-based</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Financial Timeline & Advice */}
                <div className="md:col-span-6">
                  <div className="glass-card p-6 mb-6 element-fade-in">
                    <h3 className="font-semibold mb-4">Wealth Timeline</h3>
                    
                    <div className="space-y-5">
                      <div className="bg-white rounded-lg p-4 border">
                        <div className="metal-chip mb-2">Early Wealth Phase (2017-2026)</div>
                        <p className="text-sm text-gray-600">
                          During the 甲午 period, you'll likely focus on building skills rather than accumulating wealth. This time favors investments in education and personal development that will pay off later.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border">
                        <div className="wood-chip mb-2">Growth Phase (2027-2036)</div>
                        <p className="text-sm text-gray-600">
                          The 乙未 period brings better financial stability. Your creative abilities combined with practical skills will start yielding more significant financial returns. Good time for career advancement and income growth.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border">
                        <div className="fire-chip mb-2">Peak Earning Phase (2037-2046)</div>
                        <p className="text-sm text-gray-600">
                          The 丙申 period combines your Fire day master with Metal in the earthly branch, creating favorable conditions for wealth accumulation. Your experience and reputation will lead to premium opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 element-fade-in">
                    <h3 className="font-semibold mb-4">Financial Guidance</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
                          <h4 className="font-medium">Investment Strategy</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Your chart suggests a balanced approach to investing, with consideration for:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside pl-2">
                          <li>Creative industries and intellectual property (Fire element)</li>
                          <li>Technology and innovation sectors (Water supporting Wood)</li>
                          <li>Some conservative investments for stability (Earth element)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Coins className="w-5 h-5 text-blue-500 mr-2" />
                          <h4 className="font-medium">Wealth Building Tips</h4>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Leverage your creativity to develop multiple income streams</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Build relationships with Metal-strong individuals (mentors, partners)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Balance entrepreneurial ventures with stable income sources</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Develop financial discipline through consistent saving practices</span>
                          </li>
                        </ul>
                      </div>
                    </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Relationship Overview */}
                <div className="md:col-span-7 element-fade-in">
                  <div className="glass-card p-8">
                    <h3 className="text-xl font-semibold mb-4">Relationship Overview</h3>
                    
                    <div className="space-y
