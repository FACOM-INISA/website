################################################################################
############### DADOS PARTO NORMAL #############################################
################################################################################
#!/usr/bin/env Rscript

rm(list=ls(all=TRUE))

args <- commandArgs(trailingOnly=TRUE)

set.seed(19)
library(compiler)
enableJIT(3)

library(forecast)
library(fpp2)
library(acp)
library(tscount)
library(ggplot2)
library(car)

#######################
##### Leitura dos dados
#######################

dados <- read.csv(args[1])
attach(dados)

########################
##### Análise Descritiva
########################

Y <- X
df <- data.frame(Y)
attach(df)
##### Medidas resumo de Y = numero de partos

vary <- var(Y)
dpy <- sqrt(var(Y))

#########################################################
##### Modelagem #########################################
#########################################################

D <- data.frame(df[1:180,])
attach(D)

YP <- D$df.1.180...
n <- length(YP)
m <- length(Y) - n

##### Modelo Binomial negativo

mod_nbinom <- tsglm(YP, model = list(past_obs = 1, past_mean=1), distr = "nbinom", link = "log")


##### Valores estimados

TP <- seq(1, length(YP))
EST <- data.frame(TP, YP)
EST <- fortify(EST)
EST$fitted <- fitted(mod_nbinom)
EST <- cbind(EST,
             sapply(c(lower=0.025, upper=0.975), function (p)
               qnbinom(p, mu = fitted(mod_nbinom), size = mod_nbinom$distrcoefs)))

##### Valores preditos

TP1 <- seq((n+1),(n+m))
YP1 <- Y[(n+1):(n+m)]
Y.pred <- data.frame(TP1, YP1)
Y.pred <- fortify(Y.pred)

pred <- predict(mod_nbinom, n.ahead = 9)
Int.pred <- pred$interval
x.pred <- pred$pred

###################################################
### CRIANDO UM DATAFRAME PARA EXPORTAÇÃO - KAZU ###
###################################################
teste <- data.frame(Int.pred)
teste$pred <- x.pred
write.csv(teste, args[2])
