# Our philosophy 

we made this framework so that we can write way less code

why less code ?

well code is debt and software debth although not realistical to
be zero should be as close to zero as possible and so
using this framework we have way less code 

ok way less but the abstraction is too much and i dont know what happens under the hood 

well abstraction is not inherently bad its only bad if you need to know what happens under the hood which most of tje time you wont and again this framework was tailored to our needs

ok what if i need to do crazy workarounds cuz of your crazy abstraction which "allows" me to wrote less code 

well your choice of framework was wrong then sorry :(, if anything else 8f you go by our principle of choosing the thing thqt allows ypu to get the job done with as few lines as possibldle doing workarounds in a framewrosk forces you to write more than what you could have if used a more minimal one bit do not worry we have two frameworks at our disposal where one is much less abstracted

## how to know which of the frameworks we have to choose

well we cant decide instead of you since whatever solution we come up with qill probably be wrong so instead we will lay out the pros and cons of each 

! Disclaimer

What we consider a framework and not a library is anything which during edvelopment uses some strategy that transcends the language

for exmaple nextjs is a framework and not a lib since it has a pages based routing since node by itself does not provide such functionaluty but express is a lib since everything there is just js there arent rules for writiing the code which transcned what the language has 

### Blaze

minimal bakcend library like express but on steroids 

Good for all usecases where you would prefer express over nest js for exmaple but to be a bit more precise

Pros:
- minimal
- library, not framework
- minimal abstraction
- highly customizable

Cons
- minimal so you will have to reinvent the wheel for a lot of things or choose your own packages
- you have to establish standards yourself since its a lib not a framework

### Bluze
nestjs but better 

built on top of blaze

Pros:
- framework like feel
- a lot of abstraction
- not as customazible

Cons
### Appluze

Like laravel


Pros:
- modules were written with the mind of that they are gonna be used in the framework and its just has a feeling it was made for this framework (idk how to exxplain this better) but its easy to notice it was built for the frammeowrk
