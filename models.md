# Modele  

## Użytkownicy

### Pola zdefiniowane w ramach użytkowników
**Unikalne ID na podstawie Authentication**

1. restaurants_favourite (`array`)
2. restaurants_visited (`array`)
3. restaurants_to_visit (`array`)

## Restauracje

### Pola zdefiniowane w ramach restauracji:
**Unikalne ID generowane przez Firebase**

1. name (`string`)
2. address (`string`)
3. description (`string`)
4. coordinates (`geopoint`)
5. cuisine (`array`)
6. gallery (`array`)
7. tags (`array`)
8. score_sum (`number`)
9. score_amount (`number`)

## Komentarze

### Pola zdefiniowane w ramach komentarzy:
**Unikalne ID generowane przez Firebase**

1. user_id (`reference`)
2. restaurant_id (`reference`)
3. description (`string`)
4. score (`number`)
5. created_at (`timestamp`)