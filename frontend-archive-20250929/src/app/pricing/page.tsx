"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  X, 
  Sparkles,
  Zap,
  Crown,
  Building2,
  ChevronRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { useTenant } from "@/hooks/useTenant";

const plans = [
  {
    name: "Free",
    icon: Building2,
    price: 0,
    description: "Quick org structure analysis",
    features: [
      { name: "Org Design Analyzer", included: true },
      { name: "Instant structure insights", included: true },
      { name: "Role clarity analysis", included: true },
      { name: "Gap detection", included: true },
      { name: "PDF reports", included: true },
      { name: "Culture Analysis", included: false },
      { name: "Skills Mapping", included: false },
      { name: "Action Modules", included: false },
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    icon: Zap,
    price: 149,
    description: "Core analysis + modular add-ons",
    features: [
      { name: "Everything in Free", included: true },
      { name: "Structure Analysis", included: true },
      { name: "Culture Analysis", included: true },
      { name: "Executive dashboards", included: true },
      { name: "AI recommendations", included: true },
      { name: "Skills Analysis", addon: "$49/mo" },
      { name: "Engagement Analysis", addon: "$49/mo" },
      { name: "Recognition Analysis", addon: "$39/mo" },
      { name: "Performance Analysis", addon: "$59/mo" },
      { name: "Benchmarking", addon: "$69/mo" },
      { name: "Action Modules", addon: "$49/mo" },
      { name: "Automated Flows", included: false },
      { name: "HRIS Integration", included: false },
    ],
    cta: "Start Pro Trial",
    highlighted: false,
  },
  {
    name: "Pro+",
    icon: Sparkles,
    price: 299,
    description: "All analyses with automation",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "All analysis modules included", included: true },
      { name: "All action modules included", included: true },
      { name: "Automated analysis flows", included: true },
      { name: "Advanced AI insights", included: true },
      { name: "Priority support", included: true },
      { name: "Custom reports", included: true },
      { name: "API access", included: true },
      { name: "HRIS Integration", included: false },
      { name: "Multi-tenant access", included: false },
    ],
    cta: "Start Pro+ Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: 8,
    priceUnit: "/employee/mo",
    description: "Complete platform with HRIS",
    features: [
      { name: "Everything in Pro+", included: true },
      { name: "HRIS Integration", included: true },
      { name: "Employee dashboards", included: true },
      { name: "Learning Experience Pipeline", included: true },
      { name: "Unlimited users", included: true },
      { name: "Custom integrations", included: true },
      { name: "Dedicated success manager", included: true },
      { name: "SLA guarantee", included: true },
      { name: "On-premise option", included: true },
      { name: "Multi-tenant (Superadmin)", addon: "Contact us" },
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const modules = [
  { name: "Skills Analysis", price: 49, description: "Competency mapping and gap analysis" },
  { name: "Engagement Analysis", price: 49, description: "Employee satisfaction insights" },
  { name: "Recognition Analysis", price: 39, description: "Recognition effectiveness" },
  { name: "Performance Analysis", price: 59, description: "Productivity predictions" },
  { name: "Industry Benchmarking", price: 69, description: "Competitive positioning" },
  { name: "Action Modules Bundle", price: 49, description: "All implementation modules" },
];

function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const { tenant, purchaseModule, upgradePlan } = useTenant();

  const handleSelectPlan = (planName: string) => {
    if (planName === "Free") {
      window.location.href = "/entry";
    } else if (planName === "Enterprise") {
      window.location.href = "/contact-sales";
    } else {
      upgradePlan(planName.toLowerCase().replace("+", "plus"));
    }
  };

  const handleAddModule = (moduleName: string) => {
    purchaseModule(moduleName.toLowerCase().replace(/ /g, "_"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Badge className="mb-4">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Growth Path
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, scale with insights, expand with enterprise power
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mt-8">
          <Tabs defaultValue={billing}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const monthlyPrice = plan.priceUnit ? plan.price : 
              billing === "yearly" ? Math.round(plan.price * 0.8) : plan.price;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`h-full ${plan.highlighted ? "border-primary shadow-lg" : ""}`}>
                  {plan.highlighted && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                      <Badge variant="secondary">{plan.name}</Badge>
                    </div>
                    <CardTitle className="text-2xl">
                      {monthlyPrice === 0 ? (
                        "Free"
                      ) : (
                        <>
                          ${monthlyPrice}
                          {plan.priceUnit || "/month"}
                        </>
                      )}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-600 mt-0.5" />
                          ) : feature.addon ? (
                            <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <span className={!feature.included && !feature.addon ? "text-gray-400" : ""}>
                              {feature.name}
                            </span>
                            {feature.addon && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {feature.addon}
                              </Badge>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => handleSelectPlan(plan.name)}
                      className="w-full"
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add-on Modules for Pro */}
      {tenant?.plan === "pro" && (
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Available Add-ons</h2>
              <p className="text-gray-600">
                Enhance your Pro plan with these powerful modules
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const isPurchased = tenant.purchasedModules.includes(
                  module.name.toLowerCase().replace(/ /g, "_")
                );
                
                return (
                  <Card key={module.name}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{module.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {module.description}
                          </p>
                        </div>
                        <Badge variant="secondary">${module.price}/mo</Badge>
                      </div>
                      {isPurchased ? (
                        <Button disabled className="w-full">
                          <Check className="w-4 h-4 mr-2" />
                          Activated
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleAddModule(module.name)}
                          variant="outline"
                          className="w-full"
                        >
                          Add to Plan
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  Save with Pro+
                </h3>
                <p className="text-gray-600 mb-6">
                  Get all modules + automation for just $299/month
                </p>
                <Button onClick={() => upgradePlan("proplus")}>
                  Upgrade to Pro+
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default PricingPage;
