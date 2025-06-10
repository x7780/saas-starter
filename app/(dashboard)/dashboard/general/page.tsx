"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, User, Mail, Save, CheckCircle, AlertCircle, Settings, Globe, Bell, Shield } from "lucide-react"
import { updateAccount } from "@/app/(login)/actions"
import type { User as UserType } from "@/lib/db/schema"
import useSWR from "swr"
import { Suspense } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type ActionState = {
  name?: string
  error?: string
  success?: string
}

type AccountFormProps = {
  state: ActionState
  nameValue?: string
  emailValue?: string
}

function AccountForm({ state, nameValue = "", emailValue = "" }: AccountFormProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            defaultValue={state.name || nameValue}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            defaultValue={emailValue}
            className="pl-10"
            required
          />
        </div>
      </div>
    </>
  )
}

function AccountFormWithData({ state }: { state: ActionState }) {
  const { data: user, error, isLoading } = useSWR<UserType>("/api/user", fetcher)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Full Name</Label>
          <div className="h-10 bg-slate-100 animate-pulse rounded-md"></div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Email Address</Label>
          <div className="h-10 bg-slate-100 animate-pulse rounded-md"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load user data. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  return <AccountForm state={state} nameValue={user?.name ?? ""} emailValue={user?.email ?? ""} />
}

export default function GeneralPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(updateAccount, {})

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">General Settings</h1>
          <p className="text-slate-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Information */}
          <div className="lg:col-span-5 border-0">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="h-5 w-5 text-blue-500" />
                  Account Information
                </CardTitle>
                <CardDescription>Update your personal information and account details</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" action={formAction}>
                  <Suspense fallback={<AccountForm state={state} />}>
                    <AccountFormWithData state={state} />
                  </Suspense>

                  {state.error && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">{state.error}</AlertDescription>
                    </Alert>
                  )}

                  {state.success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">{state.success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
