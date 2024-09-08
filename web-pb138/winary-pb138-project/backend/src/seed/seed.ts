import { PrismaClient, User } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();
const descriptions = [
  'A full-bodied wine with rich flavors of dark fruits and spices.',
  'A crisp and refreshing wine with citrus notes and a hint of minerality.',
  'A smooth and elegant wine with floral aromas and a creamy texture.',
  'A bold and robust wine with intense flavors of blackberries and oak.',
  'A light and fruity wine with hints of peach and melon.',
  'A complex wine with layers of flavors, including red berries and earthy undertones.',
];

const getRandomWineryAddress = () => {
  const addresses = [
    '123 Vineyard Lane, Jihomoravský kraj',
    '456 Wine Road, Středočeský kraj',
    '789 Grape Street, Moravskoslezský kraj',
    '101 Winery Avenue, Jihočeský kraj',
    '202 Cellar Drive, Plzeňský kraj',
    '303 Chateau Boulevard, Karlovarský kraj',
    '404 Merlot Way, Ústecký kraj',
    '505 Cabernet Street, Liberecký kraj',
    '606 Pinot Place, Královéhradecký kraj',
    '707 Zinfandel Lane, Pardubický kraj',
    '808 Riesling Road, Vysočina',
    '909 Chardonnay Circle, Olomoucký kraj',
    '1010 Sauvignon Street, Zlínský kraj',
    '1111 Malbec Avenue, Praha',
    '1212 Syrah Drive, Jihomoravský kraj',
  ];

  return addresses[Math.floor(Math.random() * addresses.length)]!;
};

const attributions = [
  'Dry',
  'Sweet',
  'Semi-dry',
  'Off-dry',
  'Medium-bodied',
  'Full-bodied',
  'Light-bodied',
  'Tannic',
  'Acidic',
  'Fruity',
  'Earthy',
  'Spicy',
  'Floral',
];

const getRandomWineryDescription = () => {
  const wineryDescriptions = [
    'A historic winery with a tradition of crafting exceptional wines.',
    'A family-owned winery known for its dedication to quality and craftsmanship.',
    'An innovative winery pushing the boundaries of winemaking.',
    'A picturesque winery nestled in the heart of wine country.',
    'A boutique winery specializing in small-batch, handcrafted wines.',
  ];

  return wineryDescriptions[
    Math.floor(Math.random() * wineryDescriptions.length)
  ]!;
};

const getRandomDescription = () => {
  return descriptions[Math.floor(Math.random() * descriptions.length)]!;
};

const getRandomAttribution = () => {
  return attributions[Math.floor(Math.random() * attributions.length)]!;
};

const generateRandomComposition = () => {
  const alcoholPercentage =
    Math.floor(Math.random() * (15 - 8) + 8) + Math.random();
  const roundedAlcoholPercentage = parseFloat(alcoholPercentage.toFixed(1));

  return {
    alcoholPercentage: roundedAlcoholPercentage,
    sugarGramsPerLiter: Math.random() * 50,
    glycerolGramsPerLiter: Math.random() * 10,
    totalAcidityGramsPerLiter: Math.random() * 10,
    pH: Math.random() * (4 - 3) + 3,
  };
};

const generateRandomWineData = () => {
  const description = getRandomDescription();
  const attribution = getRandomAttribution();
  const composition = generateRandomComposition();
  const price = Math.floor(Math.random() * 1000) + 100;

  return {
    description,
    attribution,
    price,
    ...composition,
  };
};

const seed = async () => {
  const seedValue = 420;
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length > 0) {
    console.log('Users already exist in the database. Skipping seeding.');
    await prisma.$disconnect();
    return;
  }

  await prisma.$transaction(async (prisma) => {
    try {
      const users: User[] = [];

      const mockedUser = {
        id: '1',
        name: 'Testovaci User',
        isAdmin: true,
        email: 'javol@mail.cz',
        password: await argon2.hash('javol'),
      };

      await prisma.user.create({
        data: mockedUser,
      });

      for (let i = 0; i < 15; i++) {
        const hashedPassword = await argon2.hash('tvoja mama');

        const newUser = await prisma.user.create({
          data: {
            name: `User ${i + 1}`,
            isAdmin: i === 0,
            password: hashedPassword,
            email: i.toString() + '@mail.com',
          },
        });

        users.push(newUser);
      }

      const locations = [
        'Jihomoravský kraj',
        'Královéhradecký kraj',
        'Praha',
        'Středočeský kraj',
        'Moravskoslezský kraj',
      ];

      const wineries = [];
      for (let i = 0; i < 15; i++) {
        const ownerId = users[i]?.id;
        if (ownerId) {
          const description = getRandomWineryDescription();
          const address = getRandomWineryAddress();
          const openingHour = Math.floor(Math.random() * 24);
          let closingHour = openingHour + Math.floor(Math.random() * 12) + 1;
          if (closingHour >= 24) closingHour -= 24;

          const openingTime = `${openingHour.toString().padStart(2, '0')}:00`;
          const closingTime = `${closingHour.toString().padStart(2, '0')}:00`;

          const newWinery = await prisma.vinary.create({
            data: {
              name: `Winery ${i + 1}`,
              ownerId: ownerId,
              description: description,
              address: address,
              openingTime: openingTime,
              closingTime: closingTime,
              location: locations[i % locations.length]!,
              phone: '+420 696 969 420',
              email: 'ballsniffer69@gmail.com',
              ico: '42069',
            },
          });
          wineries.push(newWinery);
        }
      }

      const wines = [];
      for (let i = 0; i < 15; i++) {
        const wineryId = wineries[i]?.id;
        if (wineryId) {
          const wineData = generateRandomWineData();
          const newWine = await prisma.wine.create({
            data: {
              name: `Wine ${i + 1}`,
              type: i % 3 === 0 ? 'RED' : i % 3 === 1 ? 'WHITE' : 'ROSE',
              wineryId: wineryId,
              ...wineData,
              year: i % 3 === 0 ? '2000' : i % 3 === 1 ? '2023' : '2010',
            },
          });
          wines.push(newWine);

          if (i % 2 === 0) {
            const newWine2 = await prisma.wine.create({
              data: {
                name: `Wine ${i + 16}`,
                type: i % 4 === 0 ? 'RED' : i % 4 === 1 ? 'WHITE' : 'ROSE',
                wineryId: wineryId,
                ...generateRandomWineData(),
                year: i % 3 === 0 ? '2000' : i % 3 === 1 ? '2023' : '2010',
              },
            });
            wines.push(newWine2);
          }
        }
      }
      /**
      for (let i = 0; i < 15; i++) {
        const wineryId = wineries[i]?.id;
        const wineId = wines[i]?.id;
        if (wineryId && wineId) {
          for (let j = 0; j < (i % 3) + 1; j++) {
            const randomQuantity = Math.floor(random(seedValue + i + j) * 10) + 1;
            const randomPrice = Math.floor(random(seedValue + i + j) * 100);
            await prisma.order.create({
              data: {
                vinaryId: wineryId,
                customerName: "PLHYS",
                contactPhone: "6969",
                contactEmail: "tvojemama@gmail.com",
                totalAmount: Math.floor(random(seedValue + i + j) * 1000),
                status: j % 2 === 0 ? 'COMPLETED' : 'PENDING',
                items: {
                  create: [{
                    wineId: wineId,
                    quantity: randomQuantity,
                    unitPrice: randomPrice
                  }]
                }
              }
            });
          }
        }
      }
      */

      for (let i = 0; i < 10; i++) {
        const winery = wineries[i];
        if (winery) {
          const orders = await prisma.order.findMany({
            where: {
              vinaryId: winery.id,
            },
          });
          for (const order of orders) {
            for (let k = 0; k < 2; k++) {
              const wineIndex = Math.floor(random(seedValue + i + k) * 15);
              const wineId = wines[wineIndex]?.id;
              if (wineId) {
                const randomQuantity =
                  Math.floor(random(seedValue + i + k) * 10) + 1;
                const randomPrice = Math.floor(random(seedValue + i + k) * 100);
                await prisma.orderItem.create({
                  data: {
                    orderId: order.id,
                    wineId: wineId,
                    quantity: randomQuantity,
                    unitPrice: randomPrice,
                  },
                });
              }
            }
          }
        }
      }
      const tours = [];

      for (let i = 0; i < 5; i++) {
        const tourName = `Tour ${i + 1}`;
        const location =
          locations[Math.floor(Math.random() * locations.length)];
        const address = 'Some address';
        const time = '2024-10-13';

        const newTour = await prisma.tour.create({
          data: {
            name: tourName,
            location: location!,
            address: address,
            time: time,
            status: 'SCHEDULED',
            description: descriptions[i] ?? '',
          },
        });
        tours.push(newTour);
      }

      console.log('Seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  });

  await prisma.$disconnect();
};

seed();
