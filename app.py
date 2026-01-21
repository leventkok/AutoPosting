from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from src.content_manager import ContentManager
from src.post_publisher import PostPublisher
from src.linkedin_publisher import LinkedInPublisher
import uvicorn

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Servisler
cm = ContentManager()
twitter = PostPublisher()
linkedin = LinkedInPublisher()

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """Ana sayfa - tüm postları göster"""
    posts = cm.get_all_posts()
    return templates.TemplateResponse("index.html", {"request": request, "posts": posts})


@app.get("/refresh-metrics")
async def refresh_metrics():
    """Gönderilmiş postların performans metriklerini yenile"""
    sent_posts = [p for p in cm.get_all_posts() if p.get('status') == 'sent' and p.get('api_post_id')]
    
    for post in sent_posts:
        metrics = None
        
        if post['platform'] == 'Twitter':
            metrics = twitter.get_post_metrics(post['api_post_id'])
        elif post['platform'] == 'LinkedIn':
            metrics = linkedin.get_post_metrics(post['api_post_id'])
        
        if metrics:
            cm.update_metrics(post['id'], metrics)
    
    return RedirectResponse(url="/", status_code=303)


@app.post("/schedule")
async def schedule_post(
    content: str = Form(...), 
    platform: str = Form(...), 
    schedule_time: str = Form(...)
):
    """Yeni post planla"""
    # HTML datetime-local formatını (T harfi içerir) temizle
    formatted_time = schedule_time.replace("T", " ")
    cm.add_post(content, platform, formatted_time)
    return RedirectResponse(url="/", status_code=303)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
