import { next } from '@vercel/edge';

export const config = {
  // Скрипт сработает только при заходе на главную страницу
  matcher: '/',
};

export default function middleware(request: Request) {
  // Получаем код страны из заголовков Vercel (геолокация по IP)
  const country = request.headers.get('x-vercel-ip-country') || 'RU';
  
  // Определяем список стран DACH региона
  const dachRegion = ['AT', 'DE', 'CH'];

  // Если пользователь из Австрии, Германии или Швейцарии
  if (dachRegion.includes(country)) {
    return Response.redirect(new URL('/de/', request.url));
  }

  // Для всех остальных оставляем русский (или твой дефолтный язык)
  return Response.redirect(new URL('/ru/', request.url));
}