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
	fairy = []

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

class Arena(Level):
	def enter(self, weapon, HP):
		level = Arena
		werewolf = Enemy('Werewolf', 30, 15, 60, 20)
		shadow = Enemy('Shadow Beast', 80, 8, 50, 50)
		skeleton = Enemy('Skeleton', 50, 15, 70, 40)
		demon = Enemy('Horned Demon', 70, 12, 65, 50)
		dragon = Enemy('Dragon', 100, 20, 50, 20)

		def ready_prompt(weapon, HP, enemy):
			print("\nAre you READY?")
			prompt = input("> ").lower()

			if prompt == 'ready' or prompt == 'yes' or prompt == 'y':
				Enemy.combat(enemy, weapon, HP, level)
				return Arena
			elif prompt == 'check':
				level().check_status(weapon, HP)
			else:
				print(Level.error_message)


		if len(Level.enemies_slain) < 7:

			if Level.fairy[0] and len(Level.enemies_slain) > 2:
				print("The fairy appears and magically mends your"
				 "\nailments and temporarily increases your max health to 100.")
				HP = 100
				print("The fairy disappears\n")
			else:
				pass

			if len(Level.enemies_slain) is 2:
				print("You enter into a big indoor Arena.")
				print("There are 4 creatures around the edge of the Arena.")
				print("%s, %s, %s and a %s." % (werewolf.name, shadow.name, skeleton.name, demon.name))
				print("All their eyes are on you as you walk to the center.")

				while True:
					enemy = werewolf
					ready_prompt(weapon, HP, enemy)

			if len(Level.enemies_slain) is 3:
				print("At least the creatures are considerate enough to attack 1 at a time.")
				print("3 left.")

				while True:
					enemy = shadow
					ready_prompt(weapon, HP, enemy)

			if len(Level.enemies_slain) is 4:
				print("2 left.")

				while True:
					enemy = skeleton
					ready_prompt(weapon, HP, enemy)

			if len(Level.enemies_slain) is 5:
				print("1 left.")

				while True:
					enemy = demon
					ready_prompt(weapon, HP, enemy)
				
			if len(Level.enemies_slain) is 6:
				print("The fairy's laugh can be heard echoing in the Arena.")
				print("All of a sudden, a %s appears out of nowhere." % dragon.name)

				while True:
					enemy = dragon
					ready_prompt(weapon, HP, enemy)

		else:
			print("Your luck is unbelievable.")
			print("Great job finishing the game.")
			exit(1)
					

class Treasure_room(Level):
	def enter(self, weapon, HP):

		if not Level().treasure:
			print("There is a Treasure Chest here in a small window-less room")

			while True:
				print("\nOPEN the Treasure Chest or EXIT the room?")
				prompt = input("> ").lower()

				if(prompt == 'open' or prompt == 'open treasure chest' or
					prompt == 'open chest'):
					HP = Level.max_health
					print("\n----------------------------------------")
					print("Inside you find a healing potion")
					print("You drink the potion and your health is now: %d" % HP)
					print("------------------------------------------")
					Level.treasure.append('item1')
					Treasure_room().enter(weapon, HP)
					return Treasure_room
				elif prompt == 'exit':
					Corridor().enter(weapon, HP)
					return Treasure_room
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)
				
		else:

			while True:
				print("Nothing else here.")
				print("\nEXIT the room?")
				prompt = input("> ").lower()

				if (prompt == 'exit' or prompt == 'yes' or
					prompt == 'y' or prompt == 'exit?'):
					Corridor().enter(weapon, HP)
					return Treasure_room
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)


class Corridor(Level):
	def enter(self, weapon, HP):
		level = Corridor
		dog = Enemy('Demon Dog', 30, 10, 65, 20)

		if len(Level.enemies_slain) is 1:

			print("You enter a long Corridor.")
			print("There is a %s at the end guarding a red door." % dog.name)
			print("There is a Blue door to your right.")

			while True:
				print("\nDo you want to FIGHT the %s, or OPEN the blue door?" % dog.name)
				prompt = input("> ").lower()

				if prompt == 'fight':
					Enemy.combat(dog, weapon, HP, level)
					return Corridor
				elif prompt == 'open':
					Treasure_room().enter(weapon, HP)
					return Corridor
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)

		else:
			print("The %s is dead" % dog.name)
			print("There is the Blue door.")
			print("And there is a Red door behind the %s's corpse." % dog.name)

			while True:
				print("\nDo you want to open the BLUE door or the RED door?")
				prompt = input("> ").lower()
				
				if prompt == 'blue':
					Treasure_room().enter(weapon, HP)
				elif prompt == 'red':
					print("As you reach for the door, a Magical Fairy appears.")
					print("It warns you of dangers ahead in the next room.")
					print("The Fairy offers to help you in any way it can.")
					
					while True:
						print("\nDo you accept? y/n")
						take_help = input("> ").lower()

						if take_help == 'y' or take_help == 'yes':
							Level().fairy.append(True)
							Arena().enter(weapon, HP)
							return Corridor
						elif take_help == 'n' or take_help == 'no':
							choice = False
							Level().fairy.append(False)
							Arena().enter(weapon, HP)
							return Corridor
						else:
							print(Level.error_message) 

				elif prompt == 'check':
					level().check_status(weapon, HP)	
				else:
					print(Level.error_message)



class Hallway(Level):
	def enter(self, weapon, HP):
		level = Hallway
		minotaur = Enemy('Minotaur', 40, 5, 70, 50)

		if not Level.enemies_slain:

			print("You exit the room into a hallway that leads to the right.")
			print("At the end of the hallway is a door blocked by a %s." % minotaur.name)

			while True:
				print("\nFIGHT?")
				prompt = input("> ").lower()

				if (prompt == 'fight' or prompt == 'yes' or
					prompt == 'y' or prompt == 'fight?'):
					Enemy.combat(minotaur, weapon, HP, level)
					return Hallway
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print(Level.error_message)

		else:
			while True:
				print ("With the %s slain," % minotaur.name)
				print("\nYou can now OPEN the door.")
				prompt = input("> ").lower()
				
				if prompt == 'open' or prompt == 'open door':
					Corridor().enter(weapon, HP)
					return Hallway
				elif prompt == 'check':
					Level().check_status(weapon, HP)
				else:
					print("%s\n" % Level.error_message)

#GAME_START FUNCTIONS
class Tutorial(Level):
	def enter(self, weapon):
		HP = Level.max_health
		print("You have %d health.\n" % HP)

		print("Your %s has a %d%% chance to hit." % (weapon.name, weapon.accuracy))
		print("Your %s deals %d damage on successful attack." % (weapon.name, weapon.damage))
		print("Your %s has a %d%% chance to crit on successful attack." % (weapon.name, weapon.crit))
		print("Crit damage deals double the base damage.\n")
		print("You also take a shield which is useful for blocking enemy charge-up attacks.")
		print("\nType CHECK at any time to check weapon and health stats.")
		print("Type CHECKENEMY while in battle to see the enemy's stats")
		print("\nThe commands you need to type in are displayed in CAPS")
		print("When in combat, you can use A and D as shorter commands for")
		print("ATTACK and DEFEND")

		while True:
			print("\nType NEXT to continue.")
			prompt = input("> ").lower()

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
				check_take, weapon_choice = input("> ").lower().split()

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
						print("%s\n" % Level.error_message)

				else:
					print("%s\n" % Level.error_message)

			except ValueError:
				print("Please enter 2 values.\n")

Start_room().enter()