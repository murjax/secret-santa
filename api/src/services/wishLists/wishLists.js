import { db } from 'src/lib/db'

export const wishLists = () => {
  return db.wishList.findMany()
}

export const wishListsByUser = ({ userId }) => {
  return db.wishList.findMany({ where: { userId } })
}

export const wishList = ({ id }) => {
  return db.wishList.findUnique({
    where: { id },
  })
}

export const createWishList = ({ input }) => {
  return db.wishList.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateWishList = ({ id, input }) => {
  return db.wishList.update({
    data: input,
    where: { id },
  })
}

export const deleteWishList = ({ id }) => {
  return db.wishList.delete({
    where: { id },
  })
}

export const WishList = {
  event: (_obj, { root }) => {
    return db.wishList.findUnique({ where: { id: root?.id } }).event()
  },
  user: (_obj, { root }) => {
    return db.wishList.findUnique({ where: { id: root?.id } }).user()
  },
}
