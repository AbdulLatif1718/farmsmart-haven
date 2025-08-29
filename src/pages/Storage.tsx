import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PackageOpen, Info, BarChart, Sun, Thermometer, Leaf, Droplets, Shield, Zap, TreePine, Wheat } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Storage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Premium Post-Harvest Storage Solutions</h1>
        <p className="text-muted-foreground text-lg">
          Revolutionary storage technology designed specifically for African agriculture - reducing post-harvest losses by up to 90%
        </p>
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            🌍 Specially engineered for African climates • 📈 Proven to reduce losses from 40% to less than 5% • 🌱 Supporting over 100,000 farmers across Africa
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="solutions" className="w-full">
        <div className="overflow-x-auto mb-6">
          <TabsList className="inline-flex w-max min-w-full">
            <TabsTrigger value="solutions" className="whitespace-nowrap">Premium Solutions</TabsTrigger>
            <TabsTrigger value="monitoring" className="whitespace-nowrap">Smart Monitoring</TabsTrigger>
            <TabsTrigger value="guides" className="whitespace-nowrap">Expert Guides</TabsTrigger>
            <TabsTrigger value="analytics" className="whitespace-nowrap">Loss Analytics</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="solutions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Solar Climate Chambers",
                description: "Advanced climate-controlled storage for high-value perishables like tomatoes, bananas, and mangoes",
                capacity: "2-10 tons",
                lossReduction: "95%",
                features: ["Precise temperature control (2-25°C)", "Humidity regulation (60-95%)", "Ethylene scrubbing", "Solar + battery backup", "Mobile app monitoring"],
                icon: Sun,
                priority: "HIGH",
                crops: ["Tomatoes", "Bananas", "Mangoes", "Avocados", "Leafy greens"]
              },
              {
                title: "Hermetic Grain Silos",
                description: "Oxygen-sealed storage preventing aflatoxin contamination in maize, sorghum, and millet",
                capacity: "5-100 tons",
                lossReduction: "90%",
                features: ["Airtight sealing technology", "Moisture control system", "Integrated pest management", "Quality monitoring sensors", "Easy bulk handling"],
                icon: Wheat,
                priority: "CRITICAL",
                crops: ["Maize", "Sorghum", "Millet", "Rice", "Cowpeas"]
              },
              {
                title: "Multi-Zone Cold Storage",
                description: "Professional-grade refrigeration with multiple temperature zones for diverse crops",
                capacity: "1-20 tons",
                lossReduction: "92%",
                features: ["Multi-zone temperature control", "Humidity chambers", "Rapid cooling system", "Emergency backup power", "Inventory management"],
                icon: Thermometer,
                priority: "HIGH",
                crops: ["Fish", "Meat", "Dairy", "Vegetables", "Fruits"]
              },
              {
                title: "Solar Tunnel Dryers",
                description: "High-efficiency drying systems for cassava, yam, and other root crops",
                capacity: "500kg-5 tons/batch",
                lossReduction: "85%",
                features: ["Controlled air circulation", "UV protection", "Moisture extraction", "Solar tracking system", "Weather-resistant design"],
                icon: Sun,
                priority: "MEDIUM",
                crops: ["Cassava", "Yam", "Sweet potato", "Plantain", "Cocoa"]
              },
              {
                title: "Controlled Atmosphere Storage",
                description: "Advanced gas composition control for extended storage of apples, citrus, and export crops",
                capacity: "10-50 tons",
                lossReduction: "94%",
                features: ["O2/CO2 regulation", "Nitrogen flushing", "Pressure monitoring", "Automated ventilation", "Export-grade quality"],
                icon: Leaf,
                priority: "PREMIUM",
                crops: ["Citrus", "Apples", "Coffee", "Cashews", "Export vegetables"]
              },
              {
                title: "Mobile Processing Units",
                description: "On-farm processing and packaging to add value and extend shelf life",
                capacity: "1-3 tons/day",
                lossReduction: "88%",
                features: ["On-site processing", "Packaging equipment", "Quality sorting", "Solar powered", "Mobility for cooperatives"],
                icon: PackageOpen,
                priority: "INNOVATION",
                crops: ["All crops", "Value-added products", "Processed foods", "Packaged goods"]
              }
            ].map((solution, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant={solution.priority === 'CRITICAL' ? 'destructive' : 
                            solution.priority === 'HIGH' ? 'default' : 
                            solution.priority === 'PREMIUM' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {solution.priority}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center pr-16">
                    <solution.icon className="h-6 w-6 mr-3 text-green-600" />
                    {solution.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <span className="text-sm font-semibold text-green-800 dark:text-green-200">Loss Reduction</span>
                      <span className="text-lg font-bold text-green-600">{solution.lossReduction}</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-semibold">Capacity:</span> {solution.capacity}
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-semibold">Target Crops:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {solution.crops.map((crop, i) => (
                          <Badge key={i} variant="outline" className="text-xs px-2 py-0">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-semibold">Premium Features:</span>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {solution.features.map((feature, i) => (
                          <li key={i} className="text-muted-foreground text-xs leading-relaxed">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Get Quote
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Real-Time Storage Conditions</CardTitle>
                <CardDescription>
                  AI-powered monitoring across all your storage facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">Temperature</span>
                      <span className="text-sm font-mono">18°C</span>
                    </div>
                    <Progress value={72} className="h-3 bg-blue-100" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Optimal Range: 15-22°C</span>
                      <span className="text-green-600">✓ Optimal</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">Humidity</span>
                      <span className="text-sm font-mono">62%</span>
                    </div>
                    <Progress value={62} className="h-3 bg-green-100" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Target: 60-65%</span>
                      <span className="text-green-600">✓ Perfect</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">Oxygen Level</span>
                      <span className="text-sm font-mono">3%</span>
                    </div>
                    <Progress value={15} className="h-3 bg-yellow-100" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Hermetic: 1-5%</span>
                      <span className="text-green-600">✓ Excellent</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">CO₂ Level</span>
                      <span className="text-sm font-mono">15%</span>
                    </div>
                    <Progress value={75} className="h-3 bg-purple-100" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Preservation: 10-20%</span>
                      <span className="text-green-600">✓ Ideal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  View Live Dashboard
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Storage Utilization</CardTitle>
                <CardDescription>
                  Optimize your storage capacity across all facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">Solar Climate Chambers</span>
                      <span className="text-sm font-mono">8.5/10 tons</span>
                    </div>
                    <Progress value={85} className="h-3 bg-orange-100" />
                    <div className="text-xs text-muted-foreground mt-1">Mangoes, Tomatoes</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">Hermetic Grain Silos</span>
                      <span className="text-sm font-mono">45/100 tons</span>
                    </div>
                    <Progress value={45} className="h-3 bg-green-100" />
                    <div className="text-xs text-muted-foreground mt-1">Maize, Sorghum</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">Cold Storage</span>
                      <span className="text-sm font-mono">12/20 tons</span>
                    </div>
                    <Progress value={60} className="h-3 bg-blue-100" />
                    <div className="text-xs text-muted-foreground mt-1">Fish, Vegetables</div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                    <Shield className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-xs text-green-700 dark:text-green-300">
                      All systems operating at optimal efficiency. Predicted loss rate: &lt;3%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quality Alerts</CardTitle>
                <CardDescription>
                  AI-powered quality monitoring and predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-2 rounded border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <div className="text-xs">
                      <div className="font-medium">Tomato Batch #147</div>
                      <div className="text-muted-foreground">Optimal ripening conditions maintained</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 rounded border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="text-xs">
                      <div className="font-medium">Maize Silo #3</div>
                      <div className="text-muted-foreground">Slight moisture increase detected</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 rounded border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <div className="text-xs">
                      <div className="font-medium">Cold Storage Unit A</div>
                      <div className="text-muted-foreground">Energy efficiency at 98%</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border">
                  <div className="text-sm font-semibold text-purple-800 dark:text-purple-200">AI Prediction</div>
                  <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">
                    Based on current conditions, your crops will maintain premium quality for 21 more days
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BarChart className="h-6 w-6 mr-3" />
                  Expert Storage Guides
                </CardTitle>
                <CardDescription>
                  Comprehensive guides developed by agricultural experts specifically for African conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Zero-Loss Grain Storage System",
                      description: "Complete guide to hermetic storage for maize, sorghum, and millet - eliminate aflatoxin contamination",
                      readTime: "12 min read",
                      difficulty: "Advanced",
                      crops: "Grains"
                    },
                    {
                      title: "Tropical Fruit Preservation Mastery",
                      description: "Master techniques for storing mangoes, bananas, avocados with 95% loss reduction",
                      readTime: "10 min read",
                      difficulty: "Intermediate",
                      crops: "Fruits"
                    },
                    {
                      title: "Root Crop Solar Drying Excellence",
                      description: "Professional solar drying methods for cassava, yam, and sweet potato processing",
                      readTime: "15 min read",
                      difficulty: "Beginner",
                      crops: "Root Crops"
                    },
                    {
                      title: "High-Value Vegetable Cold Chain",
                      description: "Complete cold storage and transportation guide for tomatoes, peppers, leafy greens",
                      readTime: "8 min read",
                      difficulty: "Advanced",
                      crops: "Vegetables"
                    },
                    {
                      title: "Fish and Meat Preservation Systems",
                      description: "Professional-grade preservation techniques for protein sources in tropical climates",
                      readTime: "6 min read",
                      difficulty: "Intermediate",
                      crops: "Proteins"
                    }
                  ].map((guide, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-base">{guide.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {guide.crops}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <span>{guide.readTime}</span>
                          <span className={`px-2 py-1 rounded ${
                            guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {guide.difficulty}
                          </span>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quick Reference</CardTitle>
                <CardDescription>
                  Essential storage parameters for common African crops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { crop: "Tomatoes", temp: "12-15°C", humidity: "90-95%", duration: "21-28 days", icon: "🍅" },
                    { crop: "Bananas", temp: "13-15°C", humidity: "85-90%", duration: "14-21 days", icon: "🍌" },
                    { crop: "Maize", temp: "10-15°C", humidity: "<14%", duration: "12+ months", icon: "🌽" },
                    { crop: "Cassava", temp: "0-5°C", humidity: "85-90%", duration: "2-4 weeks", icon: "🍠" },
                    { crop: "Fish", temp: "-1-0°C", humidity: "95-98%", duration: "2-3 weeks", icon: "🐟" },
                    { crop: "Mangoes", temp: "10-13°C", humidity: "85-90%", duration: "14-21 days", icon: "🥭" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.crop}</div>
                        <div className="text-xs text-muted-foreground grid grid-cols-3 gap-2 mt-1">
                          <span>{item.temp}</span>
                          <span>{item.humidity}</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                      💡 Pro Tip
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Combine controlled atmosphere storage with proper packaging to extend these durations by 50-100%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Loss Prevention Analytics</CardTitle>
                <CardDescription>
                  Data-driven insights on post-harvest loss patterns in your region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border">
                    <h4 className="font-semibold text-red-800 dark:text-red-200">Critical Loss Points</h4>
                    <div className="mt-2 space-y-2">
                      <div className="text-sm">🍅 <strong>Tomatoes:</strong> 45% loss without proper storage → <span className="text-green-600 font-semibold">&lt;5% with our systems</span></div>
                      <div className="text-sm">🌽 <strong>Maize:</strong> 30% loss to aflatoxin → <span className="text-green-600 font-semibold">&lt;2% with hermetic storage</span></div>
                      <div className="text-sm">🍌 <strong>Bananas:</strong> 40% loss from overripening → <span className="text-green-600 font-semibold">&lt;4% with climate control</span></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Success Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">92%</div>
                        <div className="text-xs text-muted-foreground">Average Loss Reduction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">300%</div>
                        <div className="text-xs text-muted-foreground">ROI within 18 months</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Regional Impact</CardTitle>
                <CardDescription>
                  Your storage solutions are transforming African agriculture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-green-600">2.5M</div>
                      <div className="text-xs text-muted-foreground">Tons Saved</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-blue-600">150K</div>
                      <div className="text-xs text-muted-foreground">Farmers Served</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-purple-600">$850M</div>
                      <div className="text-xs text-muted-foreground">Income Protected</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Food Security Impact</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Your storage network has prevented food waste equivalent to feeding 500,000 people for one year, 
                      while increasing farmer incomes by an average of 250%.
                    </p>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <TreePine className="h-4 w-4 mr-2" />
                    View Full Impact Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Storage;