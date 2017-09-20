package com.metl.data

import com.metl.utils._

import net.liftweb._
import http._
import common._
import util._
import Helpers._
import collection._

abstract class ConversationRetriever(config:ServerConfiguration,onConversationDetailsUpdated:(Conversation) => Unit) {
	val configName = config.name
	lazy val isReady:Boolean = true
	def getAllConversations:List[Conversation]
	def getAllSlides:List[Slide]
	def searchForConversation(query:String):List[Conversation]
	def searchForSlide(query:String):List[Slide]
  def queryAppliesToConversation(query:String,conversation:Conversation):Boolean
  def queryAppliesToSlide(query:String,slide:Slide):Boolean
	def searchByCourse(courseId:String):List[Conversation]
	def detailsOf(jid:String):Conversation 
  def detailsOfSlide(jid:String):Slide
  def getConversationsForSlideId(jid:String):List[String]
	def createConversation(title:String,author:String):Conversation
  def createSlide(author:String,slideType:String = "SLIDE",grouping:List[GroupSet] = Nil):Slide
	def deleteConversation(jid:String):Conversation
	def renameConversation(jid:String,newTitle:String):Conversation
	def changePermissions(jid:String,newPermissions:Permissions):Conversation
	def updateSubjectOfConversation(jid:String,newSubject:String):Conversation
	def addSlideAtIndexOfConversation(jid:String,index:Int,slideType:String):Conversation
  def addGroupSlideAtIndexOfConversation(jid:String,index:Int,grouping:GroupSet):Conversation
	def reorderSlidesOfConversation(jid:String,newSlides:List[Slide]):Conversation
  def updateConversation(jid:String,conversation:Conversation):Conversation
}

object EmptyConversations extends ConversationRetriever(EmptyBackendAdaptor,(c) => {}){
	override def getAllConversations = List.empty[Conversation]
	override def getAllSlides = List.empty[Slide]
	override def searchForConversation(query:String) = List.empty[Conversation]
	override def searchForSlide(query:String) = List.empty[Slide]
  override def queryAppliesToConversation(query:String,conversation:Conversation) = false
  override def queryAppliesToSlide(query:String,slide:Slide) = false
	override def searchByCourse(courseId:String) = List.empty[Conversation]
	override def detailsOf(jid:String) = Conversation.empty
  override def detailsOfSlide(jid:String):Slide = Slide.empty
  override def getConversationsForSlideId(jid:String):List[String] = Nil
	override def createConversation(title:String,author:String):Conversation = Conversation.empty
  override def createSlide(author:String,slideType:String = "SLIDE",grouping:List[GroupSet] = Nil):Slide = Slide.empty
	override def deleteConversation(jid:String):Conversation = Conversation.empty	
	override def renameConversation(jid:String,newTitle:String):Conversation = Conversation.empty
	override def changePermissions(jid:String,newPermissions:Permissions):Conversation = Conversation.empty
	override def updateSubjectOfConversation(jid:String,newSubject:String):Conversation = Conversation.empty
	override def addSlideAtIndexOfConversation(jid:String,index:Int,slideType:String):Conversation = Conversation.empty
  def addGroupSlideAtIndexOfConversation(jid:String,index:Int,grouping:GroupSet):Conversation = Conversation.empty
	override def reorderSlidesOfConversation(jid:String,newSlides:List[Slide]):Conversation = Conversation.empty
  override def updateConversation(jid:String,conversation:Conversation):Conversation = Conversation.empty
}
