---
title: "Building a Text Editor with C"
date: 2020-11-29
tags: [Personal Projects, C]
header:
  image: "/images/keyboard.png"
excerpt: "Personal Project to make a text editor in the C programming language."
mathjax: "true"
---

### This project was inspired by the Introduction to Computer Systems (CSSE132) class at Rose-Hulman Institute of Technology. Introduction to Computer Systems taught the basics of how to use Raspian on a Raspberry Pi, programming in C, and assembly code.

#### *Side note: I used CLion configured to Cygwin for this project.*


The first step for this project was exploring the relationship between keypresses and the bytes that we read. The program to output this information is shown below:

```c
/*** includes ***/
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <termios.h>
#include <unistd.h>
#include <errno.h>

/*** data ***/
struct termios origTermios;

/*** terminal ***/
//print error message and exit program
void kill(const char *s){
  perror(s);
  exit(1);
}

//disable raw mode
void disableRawMode(){
  if (tcsetattr(STDIN_FILENO, TCSADFLUSH, &origTermios) == -1)
      kill("tcsetattr");
}

//enable raw mode and time input
void enableRawMode(){
  if (tcgetattr(STDIN_FILENO, &origTermios) == -1) kill ("tcsetattr");
  atexit(disableRawMode);

  struct termios raw = origTermios;
  raw.c_iflag &= ~(BRKINT| INPCK | ICRNL | IXON | ISTRIP);
  raw.c_lflag &= ~(ECHO | ICANON | IEXTEN | ISIG);
  raw.c_oflag &= ~(OPOST);
  raw.c_cflag |= (CS8);
  raw.c_cc[VMIN] = 0;
  raw.c_cc[VTIME] = 1;

  tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw);
}

/*** init ***/
int main() {
  enableRawMode();

  //uses timer to track input, if no input a 0 is printed
  while (1) {
      char c = '\0';
      if (read(STDIN_FILENO, &c, 1) == -1 && errno != EAGAIN) kill("read");
      //fixes cntrl+c output
      if (iscntrl(c)) {
          printf("%d\r\n", c);
      }
      //prints number of bytes for each inputted character
      else {
          printf("%d ('%c')\r\n", c, c);
      }
      //exits program with q
      if(c == 'q') break;
  }
  return 0;
}

```
#### When the code is run, it is obvious that the timer is too short and the program should be changed to increase efficiency.


The next step for this project is adding more input/output handling and using it to draw the screen and allow the user to move the cursor around.
