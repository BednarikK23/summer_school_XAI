recept na databazi
1. zkopirovat .env.delete do .env ve stejnem adresari
2. spustit ./database.sh
3. v docker desktop spustit cotainer s jmenem teamProjectDatabase
4. otestovat spustenim npm run start
            správný výstup : connecting....
                             connected!!
                             disconnected from database

novy terminal 
1. npx prisma generate
2. npx prisma migrate dev --name meno

novy terminal
3. npx prisma studio