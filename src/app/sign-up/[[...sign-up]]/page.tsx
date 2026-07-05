import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-900 border border-zinc-800 shadow-xl",
            headerTitle: "text-white",
            headerSubtitle: "text-zinc-400",
            socialButtonsBlockButton:
              "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700",
            formFieldLabel: "text-zinc-300",
            formFieldInput: "bg-zinc-950 border-zinc-700 text-white",
            footerActionLink: "text-emerald-400 hover:text-emerald-300",
            formButtonPrimary:
              "bg-emerald-600 hover:bg-emerald-500 text-white",
          },
        }}
      />
    </div>
  );
}
