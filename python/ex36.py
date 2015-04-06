from random import randint

print("\n------------------")
print("Chance to hit is a dice roll of 1-10")
print("Enemies each have a different chance to hit.")
print("If you miss, you will get hit and lose HP that is predetermined per enemy")
print("The Defend command just resets the dice roll for chance to hit")
print("------------------")
print("""
You awaken from a deep slumber in a dimly lit room.
On a table in front of you is three weapons.
An Axe, a Dagger and a Mace.\n
Which do you take?""")

initial_health = 20

defend_message = ("\nSuccessfully defended %s's attack!")

invalid_input = ("\nWhat?")
death = ("\nThe %s killed you!\nGAME OVER")
init_combat_prompt = ("\nDo you ATTACK with your %s or DEFEND with your Shield?")
combat_prompt = ("\nATTACK or DEFEND?")

left_chest = True

def two_left_door(weapon, health):
    global left_chest

    if left_chest:
        print("There is a Chest in a small room.")
        print("\nDo you want to OPEN it? Or EXIT room?")
    else:
        print("There is an already opened Chest")
        print("EXIT?")

    while True:
        left_input = input("< ").lower()

        if left_chest and(left_input == "open" or left_input == "open chest"):
            print("You open the chest and find a Health potion!")
            health = 20
            print("You use the potion and your health is now at %s HP" % health)
            print("\nThere is nothing more to do here, do you want to Exit the room?")
            left_chest = False
        elif not left_chest and(left_input == "open" or left_input == "open chest"):
            print("It's empty.")
        elif left_input == "exit" or left_input == "exit room":
            print("You exit back into the hall")
            level_two(weapon, health)
        else:
            print(invalid_input)

two_lever = False  

def two_right_door(weapon, health):
    global two_lever
    print("You enter into a room with a hole in the floor.") 
    print("There are chains going down below but it's too dark to see")
    print("There is a lever here, do you want to PULL it? Or Exit the room?")

    while True:
        lever = input("< ").lower()

        if not two_lever and(lever == "pull" or lever == "pull lever"):
            print("Nothing happens")
        elif two_lever and(lever == "pull" or lever == "pull lever"):
            #////
            print("This hasn't been implemented yet")
            #////
        elif lever == "exit" or lever == "exit room":
            level_two(weapon, health) 
        else:
            print(invalid_input)

medusa = True

def boss_medusa(weapon, health):
    global medusa
    enemy = "Medusa"
    enemy_health = 30

    while enemy_health > 0:
        print("The %s has %d health" % (enemy, enemy_health))
        print(combat_prompt) 
        action = input("< ").lower()
        if action == "attack":
            random_chance = randint(1, 10)

            if random_chance > 3:
                enemy_health -= 10
                print("\nYour blow landed!")

                if enemy_health > 0:
                    print("%s attacks for 10 damage!" % enemy)
                    health -= 10
                    
                    if health > 0:
                        print("Your HP: %d" % health)
                    else:
                        print(death % enemy)
                        exit()
                
                else:
                    print("You have slain the %s" % enemy)
                    medusa = False
                    two_middle_door(weapon, health)

            else:
                print("\nYou missed!")
                print("%s attacks for 10 damage!" % enemy)
                health -= 10

                if health > 0:
                    print("Your HP: %d" % health)
                elif health <= 0:
                    print(death % enemy)
                    exit()

        elif action == "defend":
            print(defend_message % enemy)
            print("Your HP: %d" % health)

        else:
            print(invalid_input)


def two_middle_door(weapon, health):
    global medusa
    enemy = "Medusa"
    enemy_health = 30

    if medusa:
        print(medusa)
        print("You enter a large circular arena.")
        print("In the center of the arena stands a %s" % enemy)
        print("\nDo you want to FIGHT the %s or TURN back?" % enemy)
        while True:
            prompt = input("< ").lower()

            if prompt == "fight":
                boss_medusa(weapon, health)
            elif prompt == "exit" or prompt == "turn" or prompt == "back":
                print("Back in the hallway.")
                level_two(weapon, health)
            else:
                print(invalid_input)

    else:
        print("A dead %s lay on the floor" % enemy)

def level_two(weapon, health):
    print("\nOpen left, middle, or right door?")
    while True:
        door = input("< ").lower()

        if door == "left" or door == "left door":
            two_left_door(weapon, health)
        elif door == "right" or door == "right door":
            two_right_door(weapon, health)
        elif door == "middle":
            two_middle_door(weapon, health)
        else:
            print(invalid_input)
    
level_two_intro = """You enter a hallway lined with eery paintings.
There are 3 doors at the end of the hall: left, right and middle."""

level_one_intro = """You exit the only doorway into a torch-lined cooridor that leads to the right.
At the end of the cooridor is an %s with a giant Hammer"""

def level_one(weapon, health):
    enemy = "Ogre"
    print("You have a health gauge with %d HP\n" % initial_health)
    print(level_one_intro % enemy)
    print(init_combat_prompt % weapon)

    while True:
        action = input("< ").lower()
        random_chance = randint(1, 10)

        if action == "attack":

            if random_chance > 3:
                print("You killed the %s!" % enemy)
                print("\nThere is a door behind where the %s stood." % enemy)
                while True:
                    door = input("< ").lower()

                    if door == "open" or door == "open door":
                        print(level_two_intro)
                        level_two(weapon, health)
                    else:
                        print(invalid_input)

            else:
                print("You missed! The %s attacks and you take 7 damage!" % enemy)
                health -= 7

                if health <= 0:
                    print(death % enemy)
                    exit(0)
                print("Your HP: %d" % health)
                print(combat_prompt)

        elif action == "defend":
            print(defend_message % enemy)
            print(combat_prompt)
        else:
            print(invalid_input)

def game_start():
    weapons = ["axe", "dagger", "mace"]
    while True:
        weapon = input("> ").lower()

        if weapon == weapons[0] or(weapon == weapons[1]) or(weapon == weapons[2]):
            weapon = weapon.capitalize()
            print("You take the %s.\n" % weapon)
            level_one(weapon, initial_health)
        else:
            print("\nSelect again, or ctrl-z to exit")
               

game_start()