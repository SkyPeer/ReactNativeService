package com.rntestservice;

public class MyClass {
    int testVal = 123321;

    public static void main()     {
        System.out.println("main testVal");
    }

    public int getTestVal() {
        return this.testVal;
    }

    public void setTestVal(int val) {
        this.testVal = val;
    }

}