"use client"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import Link from "next/link"


const Page = () => {
  const handleSignIn = async () => {
    return await authClient.signIn.social({provider: "github"})
  }

  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src={"/assets/icons/logo.svg"}
            alt="logo"
            width={32}
            height={32}
          />
          <h1>EduCast</h1>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src={"/assets/icons/star.svg"}
                  alt="star"
                  width={20}
                  height={20}
                />
              ))}
            </figure>
            <p>
              EduCast is the most helpful site to learn and teach others to learn
              too
            </p>
            <article>
              <Image
                src={"/assets/images/jason.png"}
                alt="user"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2>Jason Statham</h2>
                <p>Professional Actor, Hollywood</p>
              </div>
            </article>
          </section>
        </div>
        <p>© EduCast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image src={"/assets/icons/logo.svg"} alt="logo" width={40} height={40} />
            <h1>EduCast</h1>
          </Link>
          <p>Create and share your first video <span>with EduCast</span> and upload it</p>
          <button onClick={handleSignIn}>
            <Image src={"/assets/icons/github.svg"} alt="google" width={22} height={22} />
            <span>Sign in with Github</span>
          </button>
        </section>
      </aside>
      <div className="overlay" />
    </main>
  );
}

export default Page