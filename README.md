# Optimización de Transferencia de Datos con TanStack Query y Next.js

Este proyecto es una aplicación web moderna construida con **Next.js 16+ (App Router)** y **TanStack Query v5**, diseñada para demostrar técnicas avanzadas de hidratación, React Server Components (RSC) y prefetching estratégico utilizando la **PokéAPI**.

## Funcionalidades Principales

1. **React Server Components (RSC)**: Carga inicial de datos renderizada en el servidor para mayor velocidad e SEO.
2. **HydrationBoundary**: Transición sin parpadeos de los datos del servidor al cliente mediante `dehydrate`.
3. **Prefetching en Hover (`onMouseEnter`)**: Precarga anticipada de la información detallada de cada Pokémon al pasar el cursor sobre su tarjeta.
4. **Carga Instantánea**: La vista de detalle `/pokemon/[name]` aprovecha los datos almacenados en la caché de TanStack Query para mostrar los resultados de forma inmediata.

## Estrategia de Configuración de Caché

Para optimizar el uso de red y reducir la latencia, se aplicó la siguiente configuración global en TanStack Query (`src/providers/QueryProvider.tsx`):

- **`staleTime` (24 Horas / `24 * 60 * 60 * 1000` ms)**:
  Los datos obtenidos de la PokéAPI se consideran "frescos" durante 24 horas. Mientras los datos permanezcan en este estado, TanStack Query responderá instantáneamente desde la caché local sin realizar peticiones de red redundantes.

- **`gcTime` (24 Horas / `24 * 60 * 60 * 1000` ms)**:
  Define el tiempo durante el cual los datos inactivos permanecen almacenados en la memoria del navegador antes de ser eliminados por el recolector de basura (_Garbage Collection_).

- **`refetchOnWindowFocus: false`**:
  Se deshabilita la re-obtención automática al cambiar de pestaña para evitar consumo excesivo e innecesario de peticiones HTTP a la API pública.

## Tecnologías Utilizadas

- **Next.js 16+** (App Router)
- **React 19** / **TypeScript**
- **TanStack Query v5**
- **Tailwind CSS**
- **PokéAPI**
