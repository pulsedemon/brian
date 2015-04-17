from battle import Enemy

#(name, health, damage, accuracy, crit, charge)
#are the Enemy attributes

class Weapon(object):
	def __init__(self, name, damage, accuracy, crit):
		self.name = name
		self.damage = damage
		self.accuracy = accuracy
		self.crit = crit

axe = Weapon('Axe', 9, 65, 70)
dagger = Weapon('Dagger', 4, 90, 80)
sword = Weapon('Sword', 6, 80, 60)

weapons = [axe, dagger, sword]

class Level(object):
	error_message = "What?"
	max_health = 50

	enemies_slain = []
	treasure = []

	def check_status(self, weapon, HP):
		print("\n-------------------")
		print("Health: %s" % HP)
		print("\n%s: " % weapon.name)
		print(" Damage: %s" % weapon.damage)
		print(" Accuracy: %s%%" % weapon.accuracy)
		print(" Crit Chance: %s%%" % weapon.crit)
		print("-------------------")

	def game_over(self):
		print("GAME OVER")
		exit(1)

class Treasure_room(Level):
	def enter(self, weapon, HP):

		if not Level.treasure:
			print("There is a Treasure Chest here in a small window-less room")

			while True:
				print("\nOPEN the Treasure Chest or EXIT the room?")
				prompt = raw_input("> ").lower()

				if(prompt == 'open' or prompt == 'open treasure chest' or
					prompt == 'open chest'):
					HP = Level.max_health
					print("Inside you find a healing potion")
					print("You drink the potion and your health is now: %d" % HP)
					Level.treasure.append('item1')
					Treasure_room().enter(weapon, HP)
					return Treasure_room
				elif prompt == 'exit':
					Corridor().enter(weapon, HP)
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)
				

		else:
			print("Nothing else here.")

			while True:
				print("\nEXIT?")
				prompt = raw_input("> ").lower()

				if prompt == 'exit' or prompt == 'yes':
					Corridor().enter(weapon, HP)
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)


class Corridor(Level):
	def enter(self, weapon, HP):

		if len(Level.enemies_slain) is 1:
			dog = Enemy('Demon Dog', 30, 10, 65, 30, 20)

			print("You enter a long Corridor.")
			print("There is a %s at the end of it." % dog.name)
			print("There is a DOOR to your right.")

			while True:
				print("\nDo you want to FIGHT the %s, or OPEN the door?" % dog.name)
				prompt = raw_input("> ").lower()

				if prompt == 'open':
					Treasure_room().enter(weapon, HP)
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)


		else:
			print("You enter a long Corridor.")
			print("The %s is dead" % dog.name)
			print("There is a DOOR to your right.")
			print("\nDo you want to open the TREASURE door or the DOG door?")

			prompt = raw_input("> ").lower()
			if prompt == 'TREASURE':
				pass



class Hallway(Level):
	def enter(self, weapon, HP):
		level = Hallway

		if not Level.enemies_slain:
			ogre = Enemy('Ogre', 1, 5, 70, 50, 30)

			print("You exit the room into a hallway that leads to the right.")
			print("At the end of the hallway is a door blocked by a %s." % ogre.name)

			while True:
				print("\nFIGHT?")
				prompt = raw_input("> ").lower()

				if prompt == 'fight' or prompt == 'yes':
					Enemy.combat(ogre, weapon, HP, level)
					return Hallway
				else:
					print(Level.error_message)

		else:
			while True:
				print "with the %s slain," % Level.enemies_slain[0]
				print("\nYou can now OPEN the door.")
				prompt = raw_input("> ").lower()
				
				if prompt == 'open' or prompt == 'open door':
					Corridor().enter(weapon, HP)
					return Hallway
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)

#GAME_START FUNCTIONS
class Tutorial(Level):
	def enter(self, weapon):
		HP = Level.max_health

		print("Your %s has a %d%% chance to hit." % (weapon.name, weapon.accuracy))
		print("Your %s deals %d damage on successful attack." % (weapon.name, weapon.damage))
		print("Your %s has a %d%% chance to crit on successful attack." % (weapon.name, weapon.crit))
		print("Crit damage deals double the base damage.\n")
		print("You also take a shield which is useful for blocking enemy charge-up attacks.")
		print("Type CHECK at any time when not in combat to check weapon and health stats.")

		while True:
			print("\nType NEXT to continue.")
			prompt = raw_input("> ").lower()

			if prompt == 'next':
				Hallway().enter(weapon, HP)
				return Tutorial
			elif prompt == 'check':
				Level().check_status(weapon, HP)
			else:
				print(Level.error_message)

class Start_room(Level):
	def enter(self):
		print("\nYou wake up in a small, dimly lit room.")
		print("There is a table with 3 different weapons on it.")
		print("An Axe, Dagger and a Sword.\n")

		while True:
			weapon = False

			print("CHECK or TAKE which weapon?")

			try:
				check_take, weapon_choice = raw_input("> ").lower().split()

				for i in range(len(weapons)):
					if weapon_choice == weapons[i].name.lower():
						weapon = weapons[i]

				if weapon:

					if check_take == 'check':
						print("\n------------------")
						print("%s:" % weapon.name)
						print(" Damage: %s" % weapon.damage)
						print(" Accuracy: %s%%" % weapon.accuracy)
						print(" Crit Chance: %s%%" % weapon.crit)
						print("------------------\n")
					elif check_take == 'take':
						print("You take the %s.\n" % weapon.name)
						Tutorial().enter(weapon)
						return Start_room
					else:
						print(Level.error_message)

				else:
					print(Level.error_message)

			except ValueError:
				print("Please enter 2 values.")

Start_room().enter()