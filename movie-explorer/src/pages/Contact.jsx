import React from "react";

export default function Contact() {
    const contactLinks = [
        {
            name: "Telegram",
            icon: (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0012 24a12 12 0 000-24zm5.561 8.243l-1.892 8.924c-.143.633-.518.788-1.049.49l-2.883-2.126-1.391 1.338c-.153.154-.282.282-.577.282l.207-2.935 5.343-4.825c.233-.207-.051-.322-.361-.116l-6.604 4.156-2.845-.889c-.618-.194-.629-.618.129-.914l11.116-4.284c.515-.19.964.116.807.893z"/></svg>
            ),
            url: "https://t.me/vintage_01",
            label: "@vintage_01"
        },
        {
            name: "LinkedIn",
            icon: (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            ),
            url: "https://www.linkedin.com/in/emandoyesus",
            label: "linkedin.com/in/emandoyesus"
        },
        {
            name: "GitHub",
            icon: (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            ),
            url: "https://www.github.com/emandoyesus",
            label: "github.com/emandoyesus"
        },
        {
            name: "Portfolio",
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            ),
            url: "https://emandoyesus.dev",
            label: "emandoyesus.dev"
        }
    ];

    return (
        <div className="bg-background min-h-screen text-white pt-20 pb-40 px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto">
            {/* Page Header */}
            <div className="mb-24 text-center">
                <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                    Connect With Me
                </h1>
                <p className="text-gray-500 text-sm font-black uppercase tracking-[0.4em] max-w-2xl mx-auto border-y border-white/5 py-4">
                    Exploring the boundaries of digital cinema and development
                </p>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {contactLinks.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative bg-white/5 border border-white/5 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10 hover:border-primary/30 active:scale-95 overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-700" />
                        
                        <div className="text-gray-500 group-hover:text-primary transition-colors duration-500 mb-8 transform group-hover:scale-110 transition-transform">
                            {link.icon}
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-widest mb-2">
                            {link.name}
                        </h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                            {link.label}
                        </p>

                        {/* Subtle arrow that appears on hover */}
                        <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-transform">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                    </a>
                ))}
            </div>

            {/* Call to action */}
            <div className="mt-40 text-center">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em] mb-10">Collaborate / Feedback / Support</p>
                <div className="flex flex-wrap justify-center gap-6">
                    <a 
                        href="mailto:emandoyesus@gmail.com" 
                        className="inline-block px-14 py-6 bg-primary text-black rounded-full text-xs font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
                    >
                        Send an Email
                    </a>
                    <a 
                        href="https://emandoyesus.dev" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-14 py-6 bg-white/5 border border-white/10 text-white rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
                    >
                        Visit Portfolio
                    </a>
                </div>
            </div>
        </div>
    );
}
