'use client';

import { useState, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }

      if (data.success) {
        setStatus('success');
        setShowModal(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Could not connect to server');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#173b6c]">Contact</h2>
          <p className="text-gray-500 mt-2">
            Feel free to reach out for your projects or collaborations👇
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <div>
              <h4 className="text-xl font-semibold text-[#173b6c]">Location</h4>
              <p className="text-gray-600">
                54, Prophet Tola Street, Ikotun, Lagos State.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#173b6c]">Email</h4>
              <a
                href="mailto:ejideayodele@gmail.com"
                className="text-sky-500 hover:underline"
              >
                ejideayodele@gmail.com
              </a>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#173b6c]">Call</h4>
              <a
                href="tel:+2347018911593"
                className="text-gray-600 hover:text-sky-500 hover:underline"
              >
                +234 7018911593
              </a>
            </div>

            {/* MAP */}
            <div className="w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=54%20Prophet%20Tola%20Street%20Okerube%20Ikotun%20Lagos&output=embed"
                className="w-full h-[380px]"
                loading="lazy"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg h-32"
                required
              />

              {/* ERROR */}
              {status === 'error' && (
                <p className="text-red-500 text-center">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="
                  w-full py-3 rounded-xl font-semibold text-white
                  bg-sky-500 hover:bg-sky-600 shadow-md
                  transition-all duration-300 active:scale-95
                  flex items-center justify-center gap-2
                "
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* MODAL BOX */}
          <div className="relative bg-white w-[90%] max-w-md rounded-3xl shadow-2xl p-8 text-center animate-modalPop">

            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                <span className="text-green-500 text-4xl animate-bounce">✔</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Message Sent!
            </h2>

            <p className="text-gray-500 mb-6">
              Your message has been delivered successfully. I'll get back to you as soon as possible!
            </p>

            <button
              onClick={() => {
                setShowModal(false);
                setStatus('idle');
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] text-white font-semibold shadow-[0_4px_15px_rgba(59,130,246,0.5)] hover:scale-105 hover:brightness-110 transition-all duration-300"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </section>
  );
}