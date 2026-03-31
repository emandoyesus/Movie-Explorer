import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#090b10] border-t border-white/5 pt-16 pb-12 px-6 sm:px-10 lg:px-20">
            <div className="max-w-[1700px] mx-auto">

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="text-2xl font-black tracking-[0.25em] text-white inline-block mb-6">
                            AGENCY
                        </Link>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">
                            The ultimate cinematic experience for movie enthusiasts. Discover, track,
                            and enjoy the latest releases and all-time classics in high definition.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Navigation</h4>
                        <ul className="flex flex-col gap-4 text-xs font-bold text-gray-500 tracking-wider">
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/">Home</Link></li>
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/movies">Movies</Link></li>
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/series">Series</Link></li>
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/watchlist">Watchlist</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Support</h4>
                        <ul className="flex flex-col gap-4 text-xs font-bold text-gray-500 tracking-wider">
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/contact">Contact Page</Link></li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Cookie Settings</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Connect</h4>
                        <div className="flex flex-wrap gap-4">
                            <a href="mailto:emmandoyesus@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </a>

                            <a href="https://www.linkedin.com/in/emandoyesus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>

                            <a href="https://t.me/vintage_01" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0012 24a12 12 0 000-24zm5.561 8.243l-1.892 8.924c-.143.633-.518.788-1.049.49l-2.883-2.126-1.391 1.338c-.153.154-.282.282-.577.282l.207-2.935 5.343-4.825c.233-.207-.051-.322-.361-.116l-6.604 4.156-2.845-.889c-.618-.194-.629-.618.129-.914l11.116-4.284c.515-.19.964.116.807.893z" /></svg>
                            </a>

                            <a href="https://emando-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                        © {currentYear} DevNest. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span>MADE with ❤️ BY</span>
                        <a
                            href="https://www.github.com/emandoyesus"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all"
                        >
                            Emandoyesus
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
