from random import randint

class Enemy(object):
	def __init__(self, name, health, damage, accuracy, crit):
		self.name = name
		self.health = health
		self.damage = damage
		self.accuracy = accuracy
		self.crit = crit
		self.charge = 20

	def combat(self, weapon, HP, level):
		print("\n-------------------------------")
		print("You have engaged the %s." % self.name)

		def charge(chance):			
			if chance < self.charge:
				chance = True
				return chance
			else:
				chance = False
				return chance

		def check_enemy():
			print("\n-------------------------------------")
			print("%s:" % self.name)
			print(" Health: %d" % self.health)
			print(" Damage: %d" % self.damage)
			print(" Accuracy: %d%% chance to hit" % self.accuracy)
			print(" Crit: %d%% chance to crit on successful hit" % self.crit)
			print(" Charge: %d%% chance to initiate a charge attack" % self.charge)
			print("---------------------------------------")

		charge_list = []
		charge_chance = charge(randint(1, 100))
		charge_list.append(charge_chance)

		while self.health > 0:
			print("\nYou have %s HP." % HP)
			print("The %s has %d HP." % (self.name, self.health))
			print("-------------------------------")

			if HP <= 0:
				print("\nThe %s KILLED you!\n" % self.name)
				level().game_over()

			hit_chance = randint(1, 100)
			crit_chance = randint(1, 100)
			enemy_hit_chance = randint(1, 100)
			enemy_crit_chance = randint(1, 100)

			if charge_list[0]:
				print("\n%s is charging up a powerful attack!" % self.name)

			print("\nATTACK with %s or DEFEND with shield?" % weapon.name)

			prompt = input("> ").lower()	
			print("\n-------------------------------")
			if prompt == 'attack' or prompt == 'a':

				if hit_chance < weapon.accuracy:

					if crit_chance < weapon.crit:
						print("You dealt a CRITICAL hit!")
						self.health -= weapon.damage * 2
					else:
						print("Successful hit!")
						self.health -= weapon.damage

				else:
					print("You missed.")

				if self.health <= 0:
					level.enemies_slain.append(self.name)
					print("You killed the %s!" % self.name)
					print("-------------------------------\n")
					level().enter(weapon, HP)
					return Enemy
				else: #ENEMY ATTACK OPTIONS

					if enemy_hit_chance < self.accuracy and prompt != 'defend':

						if enemy_crit_chance < self.crit and not charge_list[0]:
							HP -= self.damage * 2
							print("%s dealt a CRITICAL hit!" % self.name)
						elif charge_list[0] is True and prompt != 'defend':
							HP -= self.damage * 3
							print("%s's charge attack wrecked you!" % self.name)
						else:
							HP -= self.damage
							print("%s attacks!" % self.name)
						
						if HP <= 0:
							HP = 0

					elif prompt == 'defend':
						pass
					else:
						print("The %s missed!" % self.name)

					charge_chance = charge(randint(1, 100))
					charge_list.pop()
					charge_list.append(charge_chance)

			elif prompt == 'defend' or prompt == 'd':
				print("Defended %s's attack." % self.name)
				charge_chance = charge(randint(1, 100))
				charge_list.pop()
				charge_list.append(charge_chance)
			elif prompt == 'check':
				level().check_status(weapon, HP)
			elif prompt == 'check/enemy':
				check_enemy()
			else:
				print(level.error_message)