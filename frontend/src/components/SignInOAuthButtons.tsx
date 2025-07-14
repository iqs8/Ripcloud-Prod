import { useState, useRef, useEffect } from "react";
import { SignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowSignIn(false);
      }
    };

    if (showSignIn) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSignIn]);

  return (
  <>
    <Button
      onClick={() => setShowSignIn(true)}
      variant="secondary"
      className="text-white border-zinc-200 h-11"
    >
      Sign In
    </Button>

    {showSignIn && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900/40 min-h-screen">
        <div
          ref={modalRef}
          className="relative bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
        >
          {/* Fix: Use native <button> with reliable visibility */}
          <button
            onClick={() => setShowSignIn(false)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black text-xl flex items-center justify-center z-10"
            aria-label="Close sign in modal"
          >
            &times;
          </button>

          <SignIn
            appearance={{ elements: {
                card: "shadow-none",},
            }}
          />
        </div>
      </div>
    )}
  </>
);

};

export default SignInOAuthButtons;
