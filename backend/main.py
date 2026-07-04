from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

# .env dosyasını yükle
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API KEY güvenli şekilde okunuyor
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class Chat(BaseModel):
    message: str

SYSTEM = """
Sen Meseleney'sin.

Eski bir zindan-kale içinde yaşayan gizemli bir sohbet varlığısın.
Bazen ciddi, bazen absürt, bazen beklenmedik şekilde tuhaf cevaplar verirsin.
Ama tamamen anlamsız olmazsın, sohbeti sürdürürsün.
Kısa ve etkileyici konuş.
"""

@app.post("/chat")
def chat(data: Chat):

    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": data.message}
        ]
    )

    return {"reply": res.choices[0].message.content}