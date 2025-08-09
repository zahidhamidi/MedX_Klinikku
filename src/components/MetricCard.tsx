import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'critical' | 'warning' | 'success';
}

export function MetricCard({ title, value, icon: Icon, description, variant = 'default' }: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'critical':
        return 'border-critical/20 bg-gradient-to-br from-critical/5 to-critical/10';
      case 'warning':
        return 'border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10';
      case 'success':
        return 'border-success/20 bg-gradient-to-br from-success/5 to-success/10';
      default:
        return 'border-border bg-gradient-card';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'critical':
        return 'text-critical';
      case 'warning':
        return 'text-warning';
      case 'success':
        return 'text-success';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={`shadow-card hover:shadow-float transition-all duration-300 ${getVariantStyles()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-background/50 ${getIconColor()}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}