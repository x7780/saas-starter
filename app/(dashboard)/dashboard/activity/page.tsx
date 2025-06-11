import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  UserMinus,
  Mail,
  CheckCircle,
  Activity,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react"
import { ActivityType } from "@/lib/db/schema"
import { getActivityLogs } from "@/lib/db/queries"

const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.CREATE_TEAM]: UserPlus,
  [ActivityType.REMOVE_TEAM_MEMBER]: UserMinus,
  [ActivityType.INVITE_TEAM_MEMBER]: Mail,
  [ActivityType.ACCEPT_INVITATION]: CheckCircle,
}

const statusMap: Record<ActivityType, "success" | "warning" | "info"> = {
  [ActivityType.SIGN_UP]: "success",
  [ActivityType.SIGN_IN]: "success",
  [ActivityType.SIGN_OUT]: "info",
  [ActivityType.UPDATE_PASSWORD]: "success",
  [ActivityType.DELETE_ACCOUNT]: "warning",
  [ActivityType.UPDATE_ACCOUNT]: "success",
  [ActivityType.CREATE_TEAM]: "success",
  [ActivityType.REMOVE_TEAM_MEMBER]: "warning",
  [ActivityType.INVITE_TEAM_MEMBER]: "info",
  [ActivityType.ACCEPT_INVITATION]: "success",
}

function getRelativeTime(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return date.toLocaleDateString()
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP:
      return "Account created successfully"
    case ActivityType.SIGN_IN:
      return "Signed in to account"
    case ActivityType.SIGN_OUT:
      return "Signed out of account"
    case ActivityType.UPDATE_PASSWORD:
      return "Password changed successfully"
    case ActivityType.DELETE_ACCOUNT:
      return "Account deleted"
    case ActivityType.UPDATE_ACCOUNT:
      return "Account information updated"
    case ActivityType.CREATE_TEAM:
      return "New team created"
    case ActivityType.REMOVE_TEAM_MEMBER:
      return "Team member removed"
    case ActivityType.INVITE_TEAM_MEMBER:
      return "Team member invited"
    case ActivityType.ACCEPT_INVITATION:
      return "Team invitation accepted"
    default:
      return "Unknown action occurred"
  }
}

function getLocationFromIP(ip: string): string {
  // Mock location mapping - in real app, you'd use a geolocation service
  const locationMap: Record<string, string> = {
    "127.0.0.1": "Local",
    "::1": "Local",
    "192.168.1.1": "Local Network",
  }

  return locationMap[ip] || "Unknown Location"
}

export default async function ActivityPage() {
  const logs = await getActivityLogs()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Activity Log</h1>
          <p className="text-slate-600">Monitor your account activity and security events</p>
        </div>

        {/* Activity Log */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Activity className="h-6 w-6 text-blue-500" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-base">
              Track all actions performed on your account for security monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length > 0 ? (
              <div className="space-y-3">
                {logs.map((log) => {
                  const Icon = iconMap[log.action as ActivityType] || Settings
                  const formattedAction = formatAction(log.action as ActivityType)
                  const status = statusMap[log.action as ActivityType] || "info"
                  const location = log.ipAddress ? getLocationFromIP(log.ipAddress) : "Unknown"

                  return (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full ${
                            status === "success"
                              ? "bg-green-100 text-green-600"
                              : status === "warning"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900">{formattedAction}</p>
                            <Badge
                              variant="secondary"
                              className={`text-xs px-2 py-0 ${
                                status === "success"
                                  ? "bg-green-100 text-green-700"
                                  : status === "warning"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            {log.ipAddress && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>from IP {log.ipAddress}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{getRelativeTime(new Date(log.timestamp))}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="p-4 bg-slate-100 rounded-full mb-4">
                  <Activity className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No activity yet</h3>
                <p className="text-slate-600 max-w-md">
                  When you perform actions like signing in, updating your account, or managing your team, they'll appear
                  here for security monitoring.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Statistics */}
        {logs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Activities</p>
                    <p className="text-2xl font-bold text-slate-900">{logs.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Recent Logins</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {logs.filter((log) => log.action === ActivityType.SIGN_IN).length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <UserCog className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Security Events</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {
                        logs.filter(
                          (log) =>
                            log.action === ActivityType.UPDATE_PASSWORD || log.action === ActivityType.DELETE_ACCOUNT,
                        ).length
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-full">
                    <Lock className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
