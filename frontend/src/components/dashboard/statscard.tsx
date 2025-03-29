import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/dummies/dashboard";

export default function StatsCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border border-primary/10 bg-background/50 backdrop-blur-sm"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div
                className={`text-sm ${
                  stat.changeType === "positive"
                    ? "text-green-500"
                    : stat.changeType === "negative"
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
