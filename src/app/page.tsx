"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkwjyxgdbpqwqnppbnpx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2p5eGdkYnBxd3FucHBibnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MTU3OTAsImV4cCI6MjA5MTk5MTc5MH0.WgMFOddWYaGSLn8TBqnyddv2axaNQc10gU_kh9b2vzA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LoveWeb() {
  const [mounted, setMounted] = useState(false);
  const [mainStep, setMainStep] = useState(1);
  const [subStep, setSubStep] = useState("ASK_WILL_ANSWER");
  const [noCount, setNoCount] = useState(0);
  const [isSadMode, setIsSadMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const allGifs = {
    step1: ["https://i.pinimg.com/originals/81/cc/9c/81cc9c076500537651ad13faca97bd27.gif", "https://i.pinimg.com/originals/c5/b2/cd/c5b2cdbe3815555653dacafacb035dfe.gif", "https://i.pinimg.com/originals/90/cb/21/90cb21bfd4893d10a9bc8ec1b5ad6f5f.gif", "https://i.pinimg.com/originals/11/05/8f/11058f4928ba391a7094a18c84117a93.gif", "https://i.pinimg.com/originals/18/51/af/1851afe54522535e45a9eb6cda70aff6.gif", "https://i.pinimg.com/originals/a4/8d/ea/a48dea33d985ba9ecea56ac2039afc9a.gif", "https://i.pinimg.com/originals/73/e3/5c/73e35c36f411496e1be8e92cedb25eed.gif", "https://i.pinimg.com/originals/61/7b/ba/617bba855a4c334a4c8991958a0ad41a.gif", "https://i.pinimg.com/originals/a1/68/3b/a1683b8062cfc88d8cc97d0fc199617e.gif", "https://i.pinimg.com/originals/dc/bd/31/dcbd31a54fe6915de2130c288ce0781b.gif", "https://i.pinimg.com/originals/af/6d/08/af6d084b10eff6fb06aba742592e832e.gif"],
    step2: ["https://i.pinimg.com/originals/94/2c/cd/942ccd9edbc7e06f0af017e5dfd0a809.gif", "https://i.pinimg.com/originals/82/85/62/828562f3d49e29c525e05da5eafd59ab.gif", "https://i.pinimg.com/originals/c6/c8/39/c6c839b1b0879fe2dd6471f54d6d2b75.gif", "https://i.pinimg.com/originals/af/30/f7/af30f7b49111e25d08c4c66ddf4a3ffa.gif", "https://i.pinimg.com/originals/bd/38/31/bd3831842b5a18b5481ef28bff93e9d7.gif", "https://i.pinimg.com/originals/46/fd/bf/46fdbf53a61cad8340edeca14b35f5be.gif", "https://i.pinimg.com/originals/8d/db/df/8ddbdf88b3048a0639cdd10764ac4ec2.gif", "https://i.pinimg.com/736x/37/31/f0/3731f099e66d6c77440fe9e00ceb0f64.jpg", "https://i.pinimg.com/originals/5b/f0/22/5bf0226f2bb112114d4c0ddfea03a290.gif", "https://i.pinimg.com/originals/62/d1/ca/62d1ca7e439edd6343d88e9ae57e98f8.gif", "https://i.pinimg.com/originals/68/1d/de/681dde97d44bb304438a5bcd3794cd6b.gif"],
    step3: ["https://i.pinimg.com/originals/83/8b/a9/838ba9cee3c90d7fdbb307196163ba1b.gif", "https://i.pinimg.com/originals/33/0c/dc/330cdced8b4cb01b66e69474c3a0bc11.gif", "https://i.pinimg.com/originals/f5/70/80/f570803f0f5452a24ad62304e2f98eab.gif", "https://i.pinimg.com/originals/67/67/4a/67674a77b6b67cdb5226c7f5be67a6a4.gif", "https://i.pinimg.com/originals/f6/e2/b1/f6e2b17a8d81c2157c035af26400f479.gif", "https://i.pinimg.com/originals/a1/f4/a8/a1f4a88223d714db72f4a73d1433f71b.gif", "https://i.pinimg.com/originals/b4/88/6c/b4886caac45eadee3c960dbf55b9dbe7.gif", "https://i.pinimg.com/originals/be/d3/dc/bed3dc2239adabc9f283461f6faa3b77.gif", "https://i.pinimg.com/originals/e3/ea/1a/e3ea1a13d81e8eaa29e9bb2af61b3a4d.gif", "https://i.pinimg.com/originals/39/73/6a/39736a54c047f1d45fbb9c34334bace0.gif", "https://i.pinimg.com/originals/06/18/aa/0618aa497f9ece1e952bb1a2a1f08583.gif"],
    step4: ["https://i.pinimg.com/originals/29/ee/4d/29ee4d1d23896d630ef4c28f7228b3dd.gif", "https://i.pinimg.com/originals/f8/b7/2d/f8b72d51782f0403d63eaed044d0f6aa.gif", "https://i.pinimg.com/originals/08/7d/0a/087d0aea492ae591641f2127a91ff2bc.gif", "https://i.pinimg.com/originals/55/fb/dd/55fbdde71766f6ffed51cf2d5ed34c60.gif", "https://i.pinimg.com/originals/ca/e0/d5/cae0d581f0b7088789b4d8a5ad09a6b1.gif", "https://i.pinimg.com/originals/83/6b/18/836b188d9422132c0d4c1af9e8081f0a.gif", "https://i.pinimg.com/originals/61/bc/b5/61bcb50ca35add3d795a92ac151c44e1.gif", "https://i.pinimg.com/originals/1b/16/c8/1b16c85bdb7d9b232446a7d2522691aa.gif", "https://i.pinimg.com/originals/6c/98/22/6c982215337b81b82a45c13900b571cf.gif", "https://i.pinimg.com/originals/cf/25/81/cf2581fd586b376547e9a46a60df06e5.gif", "https://i.pinimg.com/originals/fc/02/ee/fc02ee10cf93d777b3e1e5d3afd23db2.gif"],
    typing: "https://i.pinimg.com/originals/5b/f0/22/5bf0226f2bb112114d4c0ddfea03a290.gif",
    success: "https://i.pinimg.com/originals/68/1d/de/681dde97d44bb304438a5bcd3794cd6b.gif"
  };

  if (!mounted) return null;

  const triggerSadMode = () => {
    setIsSadMode(true);
    setTimeout(() => setIsSadMode(false), 2000);
  };

  const handleNo = (limit: number, nextMainStep: number) => {
    if (noCount >= limit - 1) {
      setNoCount(0);
      setMainStep(nextMainStep);
      setSubStep("ASK_WILL_ANSWER");
    } else {
      setNoCount(noCount + 1);
      triggerSadMode();
    }
  };

  // --- ฟังก์ชันส่งข้อมูลเข้า Supabase ---
  const handleSubmit = async () => {
    try {
      if (message.trim() !== "") {
        await supabase.from('love_messages').insert([{ message: message }]);
      } else if (mainStep === 4) {
         await supabase.from('love_messages').insert([{ message: "ตอบว่า มีใจให้ค่ะ ❤️" }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setMainStep(6);
    confetti();
  };

  const btnPrimary = "bg-pink-500 text-white px-8 py-2 rounded-full font-bold hover:scale-110 transition-all shadow-md active:scale-95";
  const btnSecondary = "bg-gray-300 text-gray-700 px-8 py-2 rounded-full font-bold hover:scale-105 transition-all shadow-sm active:scale-95";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6 text-center text-black">
      <AnimatePresence mode="wait">
        {isSadMode ? (
          <motion.div key="sad" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <img src={mainStep === 1 ? allGifs.step1[noCount] : mainStep === 2 ? allGifs.step2[noCount] : mainStep === 3 ? allGifs.step3[noCount] : allGifs.step4[noCount]} className="w-64 mx-auto mb-4 rounded-xl shadow-lg" />
            <h2 className="text-2xl font-bold text-red-500">{mainStep === 3 && noCount === 9 ? "ไม่จีบแล้วเป็นแฟนเลยได้ไหม" : "ให้คิดอีกรอบไม่ได้จริงๆ หรอ..."}</h2>
          </motion.div>
        ) : (
          <div className="w-full max-w-md">
            {mainStep === 1 && (
              <div key="d1">
                {subStep === "ASK_WILL_ANSWER" ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="text-2xl font-bold text-pink-600 mb-6">จะตอบคำถามเรามั้ย?</h1>
                    <div className="flex gap-4 justify-center">
                      <button onClick={() => setSubStep("CONTENT")} className={btnPrimary}>ตอบ</button>
                      <button onClick={triggerSadMode} className={btnSecondary}>ไม่ตอบ</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                    <img src={allGifs.step1[noCount]} className="w-56 mx-auto mb-6 rounded-2xl shadow-xl" />
                    <h1 className="text-2xl font-bold text-pink-600 mb-8">{noCount === 0 ? "ว่างมั้ยมีอะไรให้ช่วยหน่อย" : "คิดอีกทีได้ไหม..."}</h1>
                    <div className="flex gap-4 justify-center">
                      <button onClick={() => {setMainStep(2); setSubStep("ASK_WILL_ANSWER"); setNoCount(0);}} className={btnPrimary}>{noCount === 0 ? "ว่างค่ะ" : "ว่างแล้วค่ะ"}</button>
                      <button onClick={() => handleNo(10, 2)} className={btnSecondary}>ไม่ว่างค่ะ</button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            {mainStep === 2 && (
              <div key="d2">
                {subStep === "ASK_WILL_ANSWER" ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h1 className="text-2xl font-bold text-pink-600 mb-6">คำถามต่อไป... จะตอบมั้ย?</h1><div className="flex gap-4 justify-center"><button onClick={() => setSubStep("CONTENT")} className={btnPrimary}>ตอบ</button><button onClick={triggerSadMode} className={btnSecondary}>ไม่ตอบ</button></div></motion.div>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}><img src={allGifs.step2[noCount]} className="w-56 mx-auto mb-6 rounded-2xl shadow-xl" /><h1 className="text-2xl font-bold text-pink-600 mb-2">สวัสดีครับคนสวย...</h1><p className="text-lg text-pink-400 mb-8 leading-tight">{noCount === 0 ? "คือว่านะอยากจะจีบคนสวยอย่างหนูนี้ได้มั้ย" : "ไม่ได้จริงๆ หรอพี่ให้หนูคิดใหม่อีกรอบ"}</p><div className="flex gap-4 justify-center"><button onClick={() => {setMainStep(3); setSubStep("ASK_WILL_ANSWER"); setNoCount(0); confetti();}} className={btnPrimary}>{noCount === 0 ? "จีบได้" : "โอเครจีบได้ๆ"}</button><button onClick={() => handleNo(10, 3)} className={btnSecondary}>ไม่ได้</button></div></motion.div>
                )}
              </div>
            )}
            {mainStep === 3 && (
              <div key="d3">
                {subStep === "ASK_WILL_ANSWER" ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h1 className="text-2xl font-bold text-pink-600 mb-6">จีบได้แล้ว... ขอถามวิธีหน่อย ตอบมั้ย?</h1><div className="flex gap-4 justify-center"><button onClick={() => setSubStep("CONTENT")} className={btnPrimary}>ตอบ</button><button onClick={triggerSadMode} className={btnSecondary}>ไม่ตอบ</button></div></motion.div>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}><img src={allGifs.step3[noCount]} className="w-56 mx-auto mb-6 rounded-2xl shadow-xl" /><h1 className="text-2xl font-bold text-pink-600 mb-8 leading-tight">{noCount === 0 ? "บอกวิธีจีบหน่อยสิ" : noCount < 9 ? "ถ้าไม่ยอมบอกดีๆ มาจะทำเสน่ห์ใส่แล้วนะ" : "ไม่จีบแล้วเป็นแฟนเลยได้ไหม"}</h1><div className="flex gap-4 justify-center"><button onClick={() => {setMainStep(5); setNoCount(0);}} className={btnPrimary}>บอกวิธี</button><button onClick={() => handleNo(10, 4)} className={btnSecondary}>ไม่บอก</button></div></motion.div>
                )}
              </div>
            )}
            {mainStep === 4 && (
              <motion.div key="d4" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><img src={allGifs.step4[noCount]} className="w-56 mx-auto mb-6 rounded-2xl shadow-xl" /><h1 className="text-2xl font-bold text-pink-600 mb-8 leading-tight">{noCount === 0 ? "หน้าสุดท้ายแล้ว จะมีใจให้เราได้บ้างยัง" : noCount < 9 ? "ให้ตอบใหม่เถอะนะ..." : "เป็นแฟนเลยได้ไหม ิิ"}</h1><div className="flex gap-4 justify-center"><button onClick={handleSubmit} className={btnPrimary + " px-10"}>มี</button><button onClick={() => handleNo(10, 6)} className={btnSecondary}>ไม่</button></div></motion.div>
            )}
            {mainStep === 5 && (
              <motion.div key="s5" className="w-full max-w-md"><img src={allGifs.typing} className="w-32 mx-auto mb-4" /><h1 className="text-xl mb-4 text-pink-600 font-bold leading-tight">พิมพ์วิธีจีบหนูบอกพี่หน่อย...</h1><textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 border-2 border-pink-300 rounded-2xl text-black focus:outline-none" rows={4} /><button onClick={handleSubmit} className={btnPrimary + " mt-4 w-full"}>ส่งคำตอบ ❤️</button></motion.div>
            )}
            {mainStep === 6 && (
              <motion.div key="s6" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><img src={allGifs.success} className="w-64 mx-auto mb-6 rounded-2xl shadow-2xl border-8 border-white" /><h1 className="text-4xl font-black text-pink-600 mb-4 leading-tight">{message !== "" ? "ได้รับคำตอบแล้วนะ!" : "มีใจหรอ งั้นเป็นแฟนเลยได้ไหม ิิ"}</h1><p className="text-pink-400 text-xl font-medium">ขอบคุณนะครับคนสวย ❤️</p></motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}