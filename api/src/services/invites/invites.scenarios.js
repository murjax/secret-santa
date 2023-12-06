export const standard = defineScenario({
  invite: {
    one: {
      data: {
        status: 'INVITED',
        event: { create: { name: 'String', date: '2023-12-06T02:48:59.269Z' } },
        user: {
          create: {
            email: 'String5759782',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        status: 'INVITED',
        event: { create: { name: 'String', date: '2023-12-06T02:48:59.270Z' } },
        user: {
          create: {
            email: 'String8508527',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
