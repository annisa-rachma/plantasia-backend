# Lodging API Documentation

## Endpoints :

List of available endpoints:

- `GET /client/products`
- `GET /client/products/:productId`

Routes below need authentication
- `GET /admin/products`

- `GET /pub/bookmarks`
- `POST /pub/bookmarks/:LodgingId`
- `DELETE /pub/bookmarks/:id`

&nbsp;

## 1. GET /client/products

_Response (200 - Ok)_

```json
[
  ...,
    {
    "id": 2,
    "name": "Issue Forty-Eight",
    "slug": "Issue-Forty-Eight",
    "description": "Dive into the deep unknown with Kinfolk’s Water Issue. Featuring underwater fashion, summery stories and profiles of people who’ve built their lives around the water, Issue Forty-Eight is an invocation to readers to protect the planet’s most precious resource by rejoicing in its beauty.",
    "price": 22,
    "mainImg": "https://www.kinfolk.com/wp-content/uploads/2023/05/K48_Spread_000-2000x1333.jpg",
    "categoryId": 4,
    "authorId": 1,
    "Category": {
      "id": 4,
      "name": "Magazine"
    }
  },
  ...,
]
```

&nbsp;


## 2. GET /client/products/:productId

_Response (200 - Ok)_

```json
{
  "id": 1,
  "name": "Issue Forty-Nine",
  "slug": "Issue-Forty-Nine",
  "description": "Join us in Scandinavia and get a deeper look inside the cultural powerhouse. In this issue, we examine Scandinavia through a different lens than most, looking beyond the quality-of-life tropes to interrogate the region's darkness and the creativity it can breed. We speak to pop icon Tove Lo, provocative filmmaker Ruben Östlund, and Sweden's preeminent painter Karin Mamma Andersson, among others. Plus essays on the mainstream, hotel art and how to make a decision.",
  "price": 22,
  "mainImg": "https://www.kinfolk.com/wp-content/uploads/2023/08/K49_Spread_000-1.jpg",
  "categoryId": 4,
  "authorId": 1,
  "Images": [
    {
      "id": 1,
      "productId": 1,
      "imgUrl": "https://www.kinfolk.com/wp-content/uploads/2023/08/K49_Spread_021.jpg"
    },
    {
      "id": 2,
      "productId": 1,
      "imgUrl": "https://www.kinfolk.com/wp-content/uploads/2023/08/K49_Spread_028.jpg"
    },
    {
      "id": 3,
      "productId": 1,
      "imgUrl": "https://www.kinfolk.com/wp-content/uploads/2023/08/K49_Spread_063.jpg"
    }
  ]
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "Product not found"
}
```
&nbsp;


## 4. GET /admin/products

_Response (200 - Ok)_

```json
[
  ...,
    {
    "id": 3,
    "name": "Issue Forty-Seven",
    "slug": "Issue-Forty-Seven",
    "description": "Rather than advocating for any particular miracle cure, Issue Forty-Seven focuses on well-being as an innate balance to be safeguarded. You’ll meet inspiring people for whom the well-being of others is paramount, featuring Walt Odets on the power of therapy, Chani Nicholas and Sonya Passi on financial well-being, Julia Bainbridge on sobriety, and Alice Sheppard on dance as a way to commune with the body—even when it hurts. Plus: interviews with fashion icon Farida Khelfa, tattoo artist Dr. Woo, superstar stylist Veneda Carter, and much more.",
    "price": 22,
    "mainImg": "https://www.kinfolk.com/wp-content/uploads/2023/02/K47_Spread_000.jpg",
    "categoryId": 4,
    "authorId": 1,
    "Category": {
      "id": 4,
      "name": "Magazine"
    },
    "User": {
      "id": 1,
      "username": "admin1",
      "email": "admin1@mail.com"
    }
  },
  ...,
]
```

&nbsp;
## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
