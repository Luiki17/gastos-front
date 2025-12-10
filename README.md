💰 Expense Tracker – Frontend

Aplicación web desarrollada con Angular 19 para la gestión visual de gastos personales.
Consume una API REST en Spring Boot y muestra la información de forma clara e interactiva, incluyendo gráficas dinámicas.

🚀 Tecnologías utilizadas

- Angular 19 (standalone components)
- TypeScript
- HTML5 / CSS3
- Bootstrap 5
- Chart.js
- RxJS

📌 Funcionalidades

✅ Añadir gastos desde la interfaz

✅ Listado de gastos en tabla

✅ Filtrado por mes y año

✅ Cálculo automático del total

✅ Gráfica de gastos mensuales con Chart.js

✅ Arquitectura basada en componentes standalone

✅ Comunicación con backend vía servicios HTTP

src/app
│
├── components
│   ├── expense-list
│   ├── expense-form
│   ├── expense-filter
│   └── expense-chart
│
├── services
│   └── expense.service.ts
│
└── models
    └── expense.model.ts

📊 Visualización de datos

- Gráfico de barras generado con Chart.js
- Actualización dinámica al filtrar gastos
- Redibujado completo del gráfico al cambiar los datos

🔗 Proyecto relacionado

👉 Backend Spring Boot:
https://github.com/Luiki17/gastos-back

👤 Autor

Desarrollado por Luis
Proyecto personal orientado a portfolio frontend/backend con Angular y Spring Boot.
